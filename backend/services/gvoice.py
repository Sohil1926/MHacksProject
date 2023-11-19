import argparse
import pyaudio
import threading
import queue
from google.cloud import speech

def transcribe_streaming():
    """Streams transcription of the microphone input."""

    print("Initializing Google Speech Client...")
    client = speech.SpeechClient()
    q = queue.Queue()
    stop_flag = threading.Event()

    def callback(in_data, frame_count, time_info, status):
        q.put(in_data)
        return (None, pyaudio.paContinue) if not stop_flag.is_set() else (None, pyaudio.paComplete)

    # Set up PyAudio
    print("Setting up PyAudio...")
    audio_interface = pyaudio.PyAudio()
    stream = audio_interface.open(
        format=pyaudio.paInt16,
        channels=1,
        rate=16000,
        input=True,
        frames_per_buffer=1024,
        stream_callback=callback,
    )

    # Start the stream
    print("Starting audio stream. Speak into the microphone...")
    stream.start_stream()

    def generator():
        while not stop_flag.is_set():
            chunk = q.get()
            if chunk is None:
                return
            data = [chunk]

            # Send the audio data to Google Speech API
            for chunk in data:
                print("Sending audio data to Google Speech API...")
                yield speech.StreamingRecognizeRequest(audio_content=chunk)

    requests = generator()
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="en-US",
    )
    streaming_config = speech.StreamingRecognitionConfig(config=config)

    responses = client.streaming_recognize(config=streaming_config, requests=requests)

    # Listen for Enter key press to stop
    def stop_listener():
        input("Press Enter to stop...\n")
        stop_flag.set()
        print("Stopping and closing audio stream...")
        stream.stop_stream()
        stream.close()
        audio_interface.terminate()
        q.put(None)

    listener_thread = threading.Thread(target=stop_listener)
    listener_thread.start()

    try:
        for response in responses:
            for result in response.results:
                print(f"Finished: {result.is_final}")
                print(f"Stability: {result.stability}")
                for alternative in result.alternatives:
                    print(f"Confidence: {alternative.confidence}")
                    print(f"Transcript: {alternative.transcript}")
    except Exception as e:
        print(f"Error during transcription: {e}")

    listener_thread.join()
    print("Transcription process stopped.")

if __name__ == "__main__":
    transcribe_streaming()
