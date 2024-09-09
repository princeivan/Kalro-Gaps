import requests

def translate_text(text, target_language='sw'):
    url = 'https://libretranslate.com/translate'
    payload = {
        'q': text,
        'source': 'en',
        'target': target_language
    }
    response = requests.post(url, data=payload)
    result = response.json()
    return result['translatedText']