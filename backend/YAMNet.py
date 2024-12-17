import csv
import json
import os

import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
from scipy.io import wavfile
import logging
import scipy.signal
from pydub import AudioSegment

# Configure logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s')

class YAMNetAudioClassifier:
    def __init__(self, model_url='https://tfhub.dev/google/yamnet/1', class_map_file='yamnet_supported_classes.json'):
        # Load YAMNet model and class mapping file
        self.model = hub.load(model_url)
        self.class_map_file = class_map_file
        self.class_names = self.load_class_names(self.model.class_map_path().numpy())
        self.supported_classes = self.load_supported_classes()

    @staticmethod
    def load_class_names(class_map_csv_text):
        """Load class names from the YAMNet model class map."""
        class_names = []
        with tf.io.gfile.GFile(class_map_csv_text) as csvfile:
            reader = csv.DictReader(csvfile)
            class_names = [row['display_name'] for row in reader]
        return class_names

    @staticmethod
    def ensure_sample_rate(original_sample_rate, waveform, desired_sample_rate=16000):
        """Resample audio waveform if necessary."""
        if original_sample_rate != desired_sample_rate:
            desired_length = int(round(len(waveform) * desired_sample_rate / original_sample_rate))
            waveform = scipy.signal.resample(waveform, desired_length)
        return desired_sample_rate, waveform

    def load_supported_classes(self):
        """Load supported classes from a JSON file."""
        with open(self.class_map_file, 'r') as f:
            return json.load(f)

    def convert_to_pcm(self, input_file, output_file):
        audio = AudioSegment.from_file(input_file, codec="pcm_s16le")
        audio.export(output_file, format="wav", codec="pcm_s16le")

    def analyze_audio(self, wav_file_name):
        """Process and analyze audio data to classify sound events."""
        try:
            sample_rate, wav_data = wavfile.read(wav_file_name)
        except ValueError as e:
            if "Unknown wave file format" in str(e):
                # If the format is unsupported, convert the file to PCM format
                pcm_file_name = "converted_pcm.wav"
                self.convert_to_pcm(wav_file_name, pcm_file_name)
                # Retry reading the converted PCM file
                sample_rate, wav_data = wavfile.read(pcm_file_name)
                # Optionally, clean up the converted file
                os.remove(pcm_file_name)
            else:
                # Re-raise the exception if it's not related to an unsupported format
                raise
        sample_rate, wav_data = self.ensure_sample_rate(sample_rate, wav_data)

        # Display audio information
        duration = len(wav_data) / sample_rate
        logger.info(f'Sample rate: {sample_rate} Hz, Duration: {duration:.2f} seconds')

        # Convert to mono if stereo
        if wav_data.ndim == 2:
            wav_data = np.mean(wav_data, axis=1)

        waveform = wav_data / np.max(np.abs(wav_data))
        scores, embeddings, spectrogram = self.model(waveform)
        
        logger.info(f"Scores shape: {scores.shape}")
        
        inferred_class = self.class_names[scores.numpy().mean(axis=0).argmax()]
        logger.info(f'Dominant sound: {inferred_class}')

        return scores.numpy(), duration

    def generate_insights(self, scores, audio_duration, frame_duration=0.48, min_gap=0.001):
        """Generate insights from the model's score data without overlapping segments across all labels."""
        logger.info(f"Number of frames: {len(scores)}")
        logger.info(f"Audio duration: {audio_duration} seconds")
        
        insights = []  # רשימה של קטעים ללא חפיפות
        previous_end_time = 0
        current_label = None
        current_confidence = 0
        current_start_time = 0

        for i, score in enumerate(scores):
            top_class = np.argmax(score)
            class_name = self.class_names[top_class]
            confidence = round(float(score[top_class]), 2)
            
            if class_name.lower() not in self.supported_classes:
                continue

            start_time = max(i * frame_duration, previous_end_time + min_gap)
            end_time = min((i + 1) * frame_duration, audio_duration)

            # אם end_time <= start_time, נתקן את הזמן הסיום כדי לוודא אורך חיובי
            if end_time <= start_time:
                end_time = start_time + min_gap

            # אם start_time חורג מעל audio_duration, נעצור את הלולאה
            if start_time >= audio_duration:
                break
            if end_time > audio_duration:
                end_time = audio_duration

            # אם התווית הנוכחית שונה מהתווית הקודמת, סיים את הקטע הקודם והתחל חדש
            if class_name != current_label:
                if current_label is not None:
                    # הוסף את הקטע הקודם לרשימת התובנות
                    formatted_start = f"{int(current_start_time // 3600)}:{int((current_start_time % 3600) // 60):02}:{current_start_time % 60:.2f}"
                    formatted_end = f"{int(previous_end_time // 3600)}:{int((previous_end_time % 3600) // 60):02}:{previous_end_time % 60:.2f}"
                    if formatted_start != formatted_end:
                        insights.append({
                            "type": current_label,
                            "id": int(np.argmax(scores[int(current_start_time / frame_duration)])),
                            "instances": [{
                                "confidence": current_confidence,
                                "adjustedStart": formatted_start,
                                "adjustedEnd": formatted_end,
                                "start": formatted_start,
                                "end": formatted_end
                            }]
                        })
                # התחל קטע חדש
                current_label = class_name
                current_confidence = confidence
                current_start_time = start_time
            else:
                # עדכן את הביטחון אם הביטחון הנוכחי גבוה יותר
                if confidence > current_confidence:
                    current_confidence = confidence

            previous_end_time = end_time

        # הוסף את הקטע האחרון אם קיים
        if current_label is not None:
            formatted_start = f"{int(current_start_time // 3600)}:{int((current_start_time % 3600) // 60):02}:{current_start_time % 60:.2f}"
            formatted_end = f"{int(previous_end_time // 3600)}:{int((previous_end_time % 3600) // 60):02}:{previous_end_time % 60:.2f}"
            if formatted_start != formatted_end:
                insights.append({
                    "type": current_label,
                    "id": int(np.argmax(scores[int(current_start_time / frame_duration)])),
                    "instances": [{
                        "confidence": current_confidence,
                        "adjustedStart": formatted_start,
                        "adjustedEnd": formatted_end,
                        "start": formatted_start,
                        "end": formatted_end
                    }]
                })

        # ארגן את התובנות לפי סוג
        organized_insights = {}
        for insight in insights:
            label = insight["type"]
            if label not in organized_insights:
                organized_insights[label] = {"id": insight["id"], "instances": []}
            organized_insights[label]["instances"].extend(insight["instances"])

        formatted_insights = [
            {"name": "yamnet", "displayName": "sound labels", "displayType": "Capsule", "results": [
                {"type": class_name, "id": data["id"], "instances": data["instances"]}
                for class_name, data in organized_insights.items()
            ]}
        ]
        
        logger.info("Generated insights:\n" + json.dumps(formatted_insights, indent=4))
        return formatted_insights

    def smooth_results(self, insights):
        """Smooth segments by merging adjacent segments where needed."""
        min_gap = 0.001  # Minimum gap of 1 millisecond between segments
        smoothed_results = []

        for result in insights:
            smoothed_instances = {}

            for instance in result["results"]:
                instance_id = instance["id"]
                instance_type = instance["type"]

                if instance_id not in smoothed_instances:
                    smoothed_instances[instance_id] = {
                        "type": instance_type,
                        "id": instance_id,
                        "instances": []
                    }

                previous_instance = None

                for segment in instance["instances"]:
                    if previous_instance and previous_instance["adjustedEnd"] == segment["adjustedStart"]:
                        previous_instance["end"] = segment["end"]
                        previous_instance["adjustedEnd"] = segment["adjustedEnd"]
                    else:
                        smoothed_instances[instance_id]["instances"].append(segment)
                        previous_instance = segment
            
            smoothed_results.append({
                "name": result["name"],
                "displayName": result["displayName"],
                "displayType": result["displayType"],
                "results": list(smoothed_instances.values())
            })

        return smoothed_results

    def save_insights(self, insights, output_file='yamnet_custom_insights_output.json'):
        """Save the insights to a JSON file."""
        with open(output_file, 'w') as f:
            json.dump(insights, f, indent=4)
        logger.info(f"Results saved to {output_file}")

    def __call__(self, wav_file_name, output_file='yamnet_custom_insights_output.json'):
        """End-to-end process of loading, analyzing, and saving audio insights."""
        # Analyze the audio file
        scores, duration = self.analyze_audio(wav_file_name)

        # Generate insights from the scores
        insights = self.generate_insights(scores, duration)
        # אין צורך ב-smooth_results אם ה-insights כבר ללא חפיפות
        
        logger.info(f"Generated insights: {json.dumps(insights, indent=4)}")
        
        # Save the insights to a JSON file
        self.save_insights(insights, output_file)
        return insights

# Example usage
if __name__ == "__main__":
    classifier = YAMNetAudioClassifier()
    classifier('path_to_audio_file.wav')