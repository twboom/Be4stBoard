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

    

    return html