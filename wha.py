import pyautogui
import time
import os
import speech_recognition as sr
import re

def capturar_voz():
    recognizer = sr.Recognizer()

    with sr.Microphone() as source:
        print("Escuchando... Di el comando para enviar el mensaje.")
        recognizer.adjust_for_ambient_noise(source)  
        audio = recognizer.listen(source)  

    try:
        print("Reconociendo...")
        texto = recognizer.recognize_google(audio, language="es-ES")
        print("Texto reconocido: ", texto)
        return texto
    except sr.UnknownValueError:
        print("No se pudo entender el audio")
        return ""
    except sr.RequestError:
        print("Error de conexión con el servicio de Google")
        return ""

def enviar_mensaje(contacto, mensaje):
    os.system("start whatsapp://")

    time.sleep(5)

    pyautogui.hotkey("ctrl", "f")  
    time.sleep(1)
    pyautogui.write(contacto) 
    time.sleep(2)

    pyautogui.press("down") 
    pyautogui.press("enter") 
    time.sleep(2)

    
    pyautogui.write(mensaje) 
    pyautogui.press("enter")  

def main():
    texto = capturar_voz()

    if texto:
        
        patron = r"envía un mensaje de whatsapp a ([a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+) que diga (.+)"
        match = re.match(patron, texto.lower())

        if match:
            contacto = match.group(1).strip()
            mensaje = match.group(2).strip()

            
            enviar_mensaje(contacto, mensaje)
        else:
            print("No pude entender el formato. Usa 'enviar mensaje de WhatsApp a [contacto] que diga [mensaje]'.")
    else:
        print("No se reconoció ningún texto válido.")

if __name__ == "__main__":
    main()
