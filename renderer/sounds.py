from renderer.utility import json_load


def sounds(html):
    # Read the sounds from the datafile 
    sound_list = json_load('data/sounds.json')

    sound_html_list = []

    for sound in sound_list:
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

        table_row = f'<tr><td>{name}</td><td>{path}</td><td>{volume}</td><td><a href="{path}" class="sound-link">{path}</a></td></tr>'

        sound_html_list.append(table_row)

    sounds_html = ''.join(sound_html_list)

    html = html.replace('{{sounds}}', sounds_html)

    return html