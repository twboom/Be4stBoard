from renderer.utility import json_load


# Render the soundboard
def board(html):
    # Read the sounds from the datafile
    sounds = json_load('data/sounds.json')
    
    sound_html_list = []

    for sound in sounds:
        name = sound['name']
        slug = sound['slug']
        if 'volume' in sound:
            volume = sound['volume']
        else:
            volume = 1
        if 'extension' in sound:
            extension = sound['extension']
        else:
            extension = 'mp3'

        path = f'sounds/{slug}.{extension}'

        src_attr = f'data-src="{path}"'
        volume_attr = f'data-volume="{volume}"'

        sound_html = f'<button class="sound-button" {src_attr} {volume_attr}>{name}</button>'

        sound_html_list.append(sound_html)

    sound_html = ''.join(sound_html_list)

    html = html.replace('{{board}}', sound_html)

    return html