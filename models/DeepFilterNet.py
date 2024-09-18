from df import enhance, init_df
from df.enhance import enhance, init_df, load_audio, save_audio
from df.utils import download_file

class DeepFilterNet():
    def __init__(self, name):
        super().__init__(name=name)
        self.model, self.df_state, _ = init_df()
        
    def __call__(self, to_analyze):
        enhanced_audio = enhance(self.model, self.df_state, to_analyze.audio)
        to_analyze.__setattr__("enhanced_audio", enhanced_audio)
        return to_analyze
    

if __name__ == "__main__":
    # Load default model
    model, df_state, _ = init_df()
    # Download and open some audio file. You use your audio files here
    audio_path = download_file(
        "https://github.com/Rikorose/DeepFilterNet/raw/e031053/assets/noisy_snr0.wav",
        download_dir=".",
    )
    audio, _ = load_audio(audio_path, sr=df_state.sr())
    # Denoise the audio
    enhanced = enhance(model, df_state, audio)
    # Save for listening
    save_audio("enhanced.wav", enhanced, df_state.sr())