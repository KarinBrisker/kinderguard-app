import torch
import torchaudio
from transformers import ASTForAudioClassification, ASTFeatureExtractor

# Load the pre-trained model and feature extractor from Hugging Face
model = ASTForAudioClassification.from_pretrained("MIT/ast-finetuned-audioset-10-10-0.4593")
feature_extractor = ASTFeatureExtractor.from_pretrained("MIT/ast-finetuned-audioset-10-10-0.4593")


# Function to load and preprocess the audio file
def preprocess_audio(audio_path):
    # Load the audio file using torchaudio
    waveform, sample_rate = torchaudio.load(audio_path)

    # Resample to the target sample rate used by the model (default is 16kHz)
    resampler = torchaudio.transforms.Resample(orig_freq=sample_rate, new_freq=16000)
    waveform = resampler(waveform)

    # Extract features using the feature extractor
    inputs = feature_extractor(waveform.squeeze().numpy(), sampling_rate=16000, return_tensors="pt")
    return inputs


# Function to predict the audio class
def predict(audio_path):
    # Preprocess the audio file
    inputs = preprocess_audio(audio_path)

    # Perform inference
    with torch.no_grad():
        outputs = model(**inputs)

    # Get the predicted class index
    predicted_class_idx = torch.argmax(outputs.logits, dim=-1).item()

    # Get the label of the predicted class
    predicted_class_label = model.config.id2label[predicted_class_idx]

    return predicted_class_label


# Example usage
audio_file_path = "place your audio file path here"
predicted_label = predict(audio_file_path)
print(f"Predicted label: {predicted_label}")
