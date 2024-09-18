# The `YAMNetAudioClassifier` class is a Python class that uses TensorFlow and TensorFlow Hub to
# analyze audio files and generate insights about the sound labels present in the audio.
import csv
import json

import numpy as np
import scipy
import tensorflow as tf
import tensorflow_hub as hub
from scipy.io import wavfile
from io import BytesIO
import soundfile as sf
print(sf.__version__)


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

    def analyze_audio(self, file_storage):
        """Load and analyze audio file."""
        # Read the file content from FileStorage object (e.g., Flask's file uploads)
        file_storage.seek(0)  # Reset file pointer to ensure we can read from the beginning
        file_stream = BytesIO(file_storage.read())  # Convert FileStorage to BytesIO

        # Read the audio data and sample rate from the BytesIO stream
        wav_data, sample_rate = sf.read(file_stream)

        # Ensure the correct sample rate
        sample_rate, wav_data = self.ensure_sample_rate(sample_rate, wav_data)

        # Show some basic information about the audio
        duration = len(wav_data) / sample_rate
        print(f'Sample rate: {sample_rate} Hz')
        print(f'Total duration: {duration:.2f}s')

        waveform = wav_data / tf.int16.max

        # Run the model, check the output
        scores, embeddings, spectrogram = self.model(waveform)
        scores_np = scores.numpy()
        spectrogram_np = spectrogram.numpy()
        inferred_class = self.class_names[scores_np.mean(axis=0).argmax()]
        print(f'The main sound is: {inferred_class}')

        return scores_np

    def generate_insights(self, scores):
        """Generate and save insights based on the model's scores."""
        frame_duration = 0.975
        grouped_results = {}

        for i, score in enumerate(scores):
            top_class = np.argmax(score)
            class_name = self.class_names[top_class]

            if class_name.lower() not in self.supported_classes:
                continue

            start_time = i * frame_duration
            end_time = (i + 1) * frame_duration
            formatted_start = f"{int(start_time // 3600):02}:{int((start_time % 3600) // 60):02}:{int(start_time % 60):02}"
            formatted_end = f"{int(end_time // 3600):02}:{int((end_time % 3600) // 60):02}:{int(end_time % 60):02}"
            if formatted_start == formatted_end:
                continue
            # Prepare the result for this segment
            segment = {
                "confidence": float(score[top_class]),
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
                "results": results
            }
        ]

        return insights_output

    def save_insights(self, insights_output, output_file='yamnet_custom_insights_output.json'):
        """Save insights to a JSON file."""
        with open(output_file, 'w') as f:
            json.dump(insights_output, f, indent=4)
        print(f"Results saved to {output_file}")

    def __call__(self, wav_file_name, output_file='yamnet_custom_insights_output.json'):
        """Process the audio file, generate insights, and save them."""
        # Analyze the audio file
        scores = self.analyze_audio(wav_file_name)
        # Generate insights from the scores
        insights = self.generate_insights(scores)
        # Save the insights to a JSON file
        self.save_insights(insights, output_file)


# Example usage
if __name__ == "__main__":
    classifier = YAMNetAudioClassifier()

    # Process the audio file and generate insights with a single call
    classifier('place your audio file path here')
