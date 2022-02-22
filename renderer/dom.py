import re
from html.parser import HTMLParser


def get_elements_by_tag_name(html, request_tag):
    '''
    Get all elements by tag name
    '''

    class Parser(HTMLParser):
        results = []

        def handle_starttag(self, tag, attrs):
            if tag == request_tag:
                self.results.append(dict(attrs))

    parser = Parser()
    parser.feed(html)
    return parser.results


def append_child(html, parent, child):
    '''
    Append child to parent
    '''

    regex = r"(?<=<{}>)(.*)(?=</{}>)".format(parent, parent)

    current_content = re.findall(regex, html)
    current_content = current_content[0]
    content = current_content + child

    html = re.sub(regex, content, html)

    return html


def reconstruct_element(tag, attrs):
    """
    Reconstructs an element from its tag and attributes.
    """
    element = f"<{tag}"
    for key, value in attrs.items():
        element += f' {key}="{value}"'
    element += ">"
    return element