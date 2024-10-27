import csv
import json

import numpy as np
import scipy
import tensorflow as tf
import tensorflow_hub as hub
from scipy.io import wavfile
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s')


class YAMNetAudioClassifier:
    def __init__(self, model_url='https://tfhub.dev/google/yamnet/1', class_map_file='yamnet_supported_classes.json'):
        self.model = hub.load(model_url)
        self.class_map_file = class_map_file
        self.class_names = self.load_class_names(self.model.class_map_path().numpy())
        self.supported_classes = self.load_supported_classes()

    @staticmethod
    def load_class_names(class_map_csv_text):
        """Returns list of class names corresponding to score vector."""
        class_names = []
        with tf.io.gfile.GFile(class_map_csv_text) as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                class_names.append(row['display_name'])
        return class_names

    @staticmethod
    def ensure_sample_rate(original_sample_rate, waveform, desired_sample_rate=16000):
        """Resample waveform if required."""
        if original_sample_rate != desired_sample_rate:
            desired_length = int(round(float(len(waveform)) /
                                       original_sample_rate * desired_sample_rate))
            waveform = scipy.signal.resample(waveform, desired_length)
        return desired_sample_rate, waveform

    def load_supported_classes(self):
        """Load supported classes from JSON."""
        with open(self.class_map_file, 'r') as f:
            return json.load(f)

    def analyze_audio(self, wav_file_name):
        """Load and analyze audio file."""
        sample_rate, wav_data = wavfile.read(wav_file_name, 'rb')
        sample_rate, wav_data = self.ensure_sample_rate(sample_rate, wav_data)

        # Show some basic information about the audio
        duration = len(wav_data) / sample_rate
        print(f'Sample rate: {sample_rate} Hz')
        print(f'Total duration: {duration:.2f}s')

        # Convert stereo to mono if needed
        if len(wav_data.shape) == 2:
            print("Converting stereo to mono...")
            wav_data = np.mean(wav_data, axis=1)

        waveform = wav_data / tf.int16.max

        # Run the model, check the output
        scores, embeddings, spectrogram = self.model(waveform)
        scores_np = scores.numpy()
        spectrogram_np = spectrogram.numpy()
        inferred_class = self.class_names[scores_np.mean(axis=0).argmax()]
        print(f'The main sound is: {inferred_class}')

        return scores_np, duration

    def generate_insights(self, scores, video_duration):
        """Generate and save insights based on the model's scores, ensuring time does not exceed video duration and adding a small gap if needed."""
        frame_duration = 0.975
        grouped_results = {}
        previous_end_time = 0  # Initialize with the start of the video
        min_gap = 0.001  # Minimum gap of 1 millisecond between segments

        for i, score in enumerate(scores):
            top_class = np.argmax(score)
            class_name = self.class_names[top_class]

            if class_name.lower() not in self.supported_classes:
                continue

            # Calculate start and end times for the current segment
            start_time = max(i * frame_duration, previous_end_time)
            end_time = min((i + 1) * frame_duration, video_duration)

            # Ensure a small gap between segments by adjusting the end time if it overlaps
            if start_time < previous_end_time:
                start_time = previous_end_time + min_gap
            if end_time <= start_time:
                end_time = start_time + min_gap  # Add a small gap to avoid exact overlap

            # Format start and end times without limiting decimal places for seconds
            formatted_start = f"{int(start_time // 3600)}:{int((start_time % 3600) // 60):02}:{start_time % 60:.6f}"
            formatted_end = f"{int(end_time // 3600)}:{int((end_time % 3600) // 60):02}:{end_time % 60:.6f}"

            # Update previous_end_time for the next segment to start after this one
            previous_end_time = end_time

            # Add to grouped results (continue with rest of logic as needed)

            # Format start and end times without limiting the decimal places for seconds
            formatted_start = f"{int(start_time // 3600)}:{int((start_time % 3600) // 60):02}:{start_time % 60:.6f}"
            formatted_end = f"{int(end_time // 3600)}:{int((end_time % 3600) // 60):02}:{end_time % 60:.6f}"
            
            # Ensure non-zero time intervals
            if formatted_start == formatted_end:
                continue

            # Prepare the result for this segment
            segment = {
                "confidence": round(float(score[top_class]), 2),
                "adjustedStart": formatted_start,
                "adjustedEnd": formatted_end,
                "start": formatted_start,
                "end": formatted_end
            }

            # Group by class name
            if class_name not in grouped_results:
                grouped_results[class_name] = {
                    "id": i,  # Assign the first instance ID
                    "instances": []
                }

            grouped_results[class_name]["instances"].append(segment)

        # Format the output into the required structure
        results = []
        for class_name, data in grouped_results.items():
            results.append({
                "instances": data["instances"],
                "type": class_name,  # Label for this class
                "id": data["id"]  # The ID of the first occurrence of this class
            })

        insights_output = [
            {
                "name": "yamnet",
                "displayName": "sound labels",
                "displayType": "Capsule",
                "results": results  # Here `results` is a list of dictionaries
            }
        ]

        # Add a debug print to see the structure of `insights_output`
        print(json.dumps(insights_output, indent=4))
        
        return insights_output
    
    def smooth_results(self, insights):
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

    def save_insights(self, insights_output, output_file='yamnet_custom_insights_output.json'):
        """Save insights to a JSON file."""
        with open(output_file, 'w') as f:
            json.dump(insights_output, f, indent=4)
        print(f"Results saved to {output_file}")

    def __call__(self, wav_file_name, output_file='yamnet_custom_insights_output.json'):
        """Process the audio file, generate insights, and save them."""
        # Analyze the audio file
        scores, duration = self.analyze_audio(wav_file_name)
        # Generate insights from the scores
        insights = self.generate_insights(scores, duration)
        # Smooth the results
        smoothed_insights = self.smooth_results(insights)

        logger.info(f"Generated {len(smoothed_insights)} insights")
        print(f"Insights: {json.dumps(insights, indent=4)}")
        print(f"Smoothed Insights: {json.dumps(smoothed_insights, indent=4)}")

        # Save the insights to a JSON file
        self.save_insights(insights, output_file)
        return smoothed_insights


# Example usage
if __name__ == "__main__":
    classifier = YAMNetAudioClassifier()

    # Process the audio file and generate insights with a single call
    classifier('place your audio file path here')