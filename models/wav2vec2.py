import torch
import torchaudio
from transformers import Wav2Vec2ForSequenceClassification, Wav2Vec2Processor

# Load model and processor from Hugging Face
device = 'cpu'
model_name = "facebook/wav2vec2-base-960h"
processor = Wav2Vec2Processor.from_pretrained(model_name, clean_up_tokenization_spaces=False)
model = Wav2Vec2ForSequenceClassification.from_pretrained(model_name).to(device)



# Load and preprocess audio
def preprocess_audio(audio_path):
    waveform, sample_rate = torchaudio.load(audio_path)

    # Resample if necessary
    if sample_rate != 16000:
        resampler = torchaudio.transforms.Resample(orig_freq=sample_rate, new_freq=16000)
        waveform = resampler(waveform)

    # Convert to numpy for processor
    try:
        # Ensure that you are calling the processor correctly
        inputs = processor(waveform.squeeze().numpy(), sampling_rate=16000, return_tensors="pt", padding=True)
        print("Audio preprocessed successfully")
    except Exception as e:
        print(f"An error occurred: {e}")

    inputs = processor(waveform.squeeze().numpy(), sampling_rate=16000, return_tensors="pt", padding=True)
    return inputs


# Prediction
def predict_emotion(audio_path):
    inputs = preprocess_audio(audio_path)
    with torch.no_grad():
        outputs = model(**inputs)

    # Get the predicted label
    predicted_class_idx = torch.argmax(outputs.logits, dim=-1).item()
    predicted_label = model.config.id2label[predicted_class_idx]

    return predicted_label


# Example usage
audio_file = 'noisy_snr0.wav'
emotion = predict_emotion(audio_file)
print(f"Predicted emotion: {emotion}")

