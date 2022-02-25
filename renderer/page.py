import renderer.minifier as minify
from renderer.utility import append_time
from renderer.dom import get_elements_by_tag_name, append_child, reconstruct_element
from renderer.board import board
from renderer.sources import sources
from renderer.sounds import sounds


# Build the page
def build_page(page) -> None:
    """
    Builds a page
    :param page: An object containing the page's source, target, and template
    """

    print('[++] Building page:', page['target'])

    source = page['source']
    target = page['target']
    template = page['template']
    title = page['title']

    # Check for exceptions
    if source.endswith('!'):
        source = source[:-1]
        exception = check_exception(source)
    else:
        exception = None

    # Read the source file
    with open(f'src/pages/{source}', 'r') as f:
        source = f.read()

    # Handle exception
    if exception:
        source = exception(source)

    # Read the template file
    if template is not None:
        output = fill_template(template, source)
    else:
        output = source

    output = output.replace('{{title}}', title)

    output = minify.html(output)

    export_page(output, target)


# Fill the template
def fill_template(template, source) -> str:
    with open(f'src/templates/{template}', 'r') as f:
        template = f.read()
    filled_template = template.replace('{{content}}', source)
    return filled_template


# Export the page
def export_page(page, target) -> None:
    page = append_time(page)
    page = include_css(page)
    with open(f'build/{target}', 'w') as f:
        f.write(page)


# Include the css directly
def include_css(html) -> str:
    css_files = []
    css_files_attrs = []
    files = get_elements_by_tag_name(html, 'link')
    for file in files:
        if file['rel'] == 'stylesheet':
            css_files_attrs.append(reconstruct_element('link', file))
            if file['href'].startswith('_') and not file['href'].endswith('.css'):
                with open('config/style.config', 'r') as f:
                    lines = f.read().splitlines()
                    for line in lines:
                        if line.startswith(file['href'][1:]):
                            css_files.extend(line.split('->')[1].split(','))
            else:
                css_files.append(file['href'])

    css_html = ''
    for file in css_files:
        with open(f'src/styles/{file}', 'r') as f:
            css_html += f.read()
    css_html = minify.css(css_html)
    css_html = f'<style>{css_html}</style>'

    html = append_child(html, 'head', css_html)

    # Remove the old css links
    for file in css_files_attrs:
        html = html.replace(file, '')

    return html


# Check for exception
def check_exception(source) -> None:
    if source == 'board.html':
        return board
    if source == 'sources.html':
        return sources
    if source == 'sounds.html':
        return sounds