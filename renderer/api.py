from renderer.utility import json_load
import json


def api():
    # Adding sounds to api/sounds.json
    print('[*] Adding sounds to api/sounds.json')
    sounds()

    # Adding sources to api/sources.json
    print('[*] Adding sources to api/sources.json')
    sources()


# Sounds
def sounds():
    sounds = json_load('data/sounds.json')
    sources = json_load('data/sources.json')

    for sound in sounds:
        slug = sound['slug']
        if 'extension' in sound:
            extension = sound['extension']
        else:
            sound['extension'] = 'mp3'
            extension = 'mp3'
        if not 'volume' in sound:
            sound['volume'] = 1
        path = f'sounds/{slug}.{extension}'
        sound['path'] = path

        source = next((x for x in sources if slug in x['sounds']), None)
        if source:
            sound['source'] = source['name']

    # Export sounds to api/sounds.json
    with open('build/api/sounds.json', 'w') as f:
        json.dump(sounds, f)


# Sources
def sources():
    sources = json_load('data/sources.json')

    # Export sounds to api/sounds.json
    with open('build/api/sources.json', 'w') as f:
        json.dump(sources, f)