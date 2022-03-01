from renderer.utility import json_load


# Render the soundboard
def sources(html):
    # Read the sounds from the datafile
    sources = json_load('data/sources.json')
    sounds = json_load('data/sounds.json')

    sound_count = len(sounds)
    source_count = len(sources)
    clipper_count = len(set([source['clipper'] for source in sources]))

    html = html.replace('{{sound-count}}', str(sound_count))
    html = html.replace('{{source-count}}', str(source_count))
    html = html.replace('{{clipper-count}}', str(clipper_count))

    source_list = []

    for source in sources:
        clipper = source['clipper']
        name = source['name']
        link = source['link']
        platform = source['platform'].capitalize()
        source_sounds = source['sounds']

        sound_list = []

        for sound in source_sounds:
            sound = next(x for x in sounds if x["slug"] == sound )
            sound_name = sound['name']
            slug = sound['slug']

            if 'extension' in sound:
                extension = sound['extension']
            else:
                extension = 'mp3'

            path = f'sounds/{slug}.{extension}'
            src_attr = f'data-src="{path}"'

            sound_html = f'<li class="sound-preview" {src_attr}>{sound_name}</li>'

            sound_list.append(sound_html)

        sound_html = ''.join(sound_list)

        source_html = f'''
        <section class="source">
            <h1>{name}</h1>
            <p>Clipped by: {clipper}</p>
            <p>Find it <a href="{link}">here</a> on {platform}!</p>
            <ul>
                {sound_html}
            </ul>
        </section>
        '''

        source_list.append(source_html)
    
    source_list = ''.join(source_list)

    html = html.replace('{{sources}}', source_list)

    return html