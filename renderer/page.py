import renderer.minifier as minify


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
    with open(f'build/{target}', 'w') as f:
        f.write(page)