import renderer.minifier as minify
from renderer.utility import append_time
from renderer.dom import get_elements_by_tag_name, append_child, reconstruct_element


# Build the page
def build_page(page) -> None:
    """
    Builds a page
    :param page: An object containing the page's source, target, and template
    """

    source = page['source']
    target = page['target']
    template = page['template']

    # Read the source file
    with open(f'src/pages/{source}', 'r') as f:
        source = f.read()

    # Read the template file
    if template is not None:
        output = fill_template(template, source)
    else:
        output = source

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

    print(css_files)

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