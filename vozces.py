import requests
import pygame
import io
import webbrowser
import random
import time

ELEVEN_LABS_API_KEY = "sk_ff74d1213bcc17e82aa80c247b127fcea50b11c1657226d3"  # Reemplázala con tu clave válida
VOICE_ID = "21m00Tcm4TlvDq8ikWAM"  # ID de voz de Aria en ElevenLabs
YOUTUBE_API_KEY="AIzaSyBe2dbGHcVwnaHDxzm8FU2UUNDjhmoeF1Q"

# Frases estilo DJ en español
frasesDJ = [
    "Y ahora prepárate, porque lo que viene es pura magia para tus oídos.",
    "Dicen que la música es el lenguaje universal, y aquí te traigo una canción especial.",
    "Sube el volumen, déjate llevar por el ritmo y disfruta de la música.",
    "Cada canción es un viaje, y estamos a punto de despegar hacia un nuevo destino sonoro.",
    "Que el ritmo no pare, porque esto apenas comienza. ¡Dale play a la emoción!",
    "Respira hondo, siente el ritmo y deja que la música haga su magia."
]

# Función para obtener audio desde ElevenLabs
def generar_audio(texto, voice_id="21m00Tcm4TlvDq8ikWAM"):
    url = "https://api.elevenlabs.io/v1/text-to-speech/" + voice_id
    headers = {
        "xi-api-key": ELEVEN_LABS_API_KEY,
        "Content-Type": "application/json"
    }
    data = {
        "text": texto,
        "model_id": "eleven_multilingual_v2",  # Modelo mejorado para español
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.8}
    }

    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 200:
        return io.BytesIO(response.content)
    else:
        print("❌ Error al generar la voz:", response.text)
        return None

# Función para reproducir el audio generado
def reproducir_audio(audio_stream):
    pygame.mixer.init()
    pygame.mixer.music.load(audio_stream, "mp3")
    pygame.mixer.music.play()
    
    while pygame.mixer.music.get_busy():
        time.sleep(0.1)  # Espera a que termine de hablar

# Función para buscar y abrir un video en YouTube
def buscar_youtube(query):
    url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={query}&type=video&key={YOUTUBE_API_KEY}"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        if data["items"]:
            video_id = data["items"][0]["id"]["videoId"]
            video_url = f"https://www.youtube.com/watch?v={video_id}"
            return video_url
    return None

# Simulación de comando de voz "reproduce"
def ejecutar_asistente(consulta):
    frase_dj = frasesDJ[0]  # Puedes cambiar esto por una selección aleatoria
    print("🎤 Diciendo:", frase_dj)

    audio_stream = generar_audio(frase_dj)
    
    if audio_stream:
        # Inicia la reproducción de la frase
        reproducir_audio(audio_stream)

        # Busca y reproduce el video cuando la frase vaya a la mitad
        video_url = buscar_youtube(consulta)
        if video_url:
            print("📺 Abriendo video:", video_url)
            webbrowser.open(video_url)
        else:
            print("❌ No se encontró un video.")

# 🚀 Prueba el asistente
ejecutar_asistente("Bad Bunny - Tití Me Preguntó")