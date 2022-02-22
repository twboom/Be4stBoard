from re import sub as re_sub, findall as re_findall

from renderer.dom import append_child, get_elements_by_tag_name


def html(code) -> str:
    code = code.replace('\n', '')
    code = code.replace('\t', '')
    code = code.replace('  ', '')

    return code


def css(css) -> str:
    """
    Minify the CSS
    """
    
    # remove comments - this will break a lot of hacks :-P
    css = re_sub( r'\s*/\*\s*\*/', "$$HACK1$$", css ) # preserve IE<6 comment hack
    css = re_sub( r'/\*[\s\S]*?\*/', "", css )
    css = css.replace( "$$HACK1$$", '/**/' ) # preserve IE<6 comment hack

    # url() doesn't need quotes
    css = re_sub( r'url\((["\'])([^)]*)\1\)', r'url(\2)', css )

    # spaces may be safely collapsed as generated content will collapse them anyway
    css = re_sub( r'\s+', ' ', css )

    # shorten collapsable colors: #aabbcc to #abc
    css = re_sub( r'#([0-9a-f])\1([0-9a-f])\2([0-9a-f])\3(\s|;)', r'#\1\2\3\4', css )

    # fragment values can loose zeros
    css = re_sub( r':\s*0(\.\d+([cm]m|e[mx]|in|p[ctx]))\s*;', r':\1;', css )

    for rule in re_findall( r'([^{]+){([^}]*)}', css ):

        # we don't need spaces around operators
        selectors = [re_sub( r'(?<=[\[\(>+=])\s+|\s+(?=[=~^$*|>+\]\)])', r'', selector.strip() ) for selector in rule[0].split( ',' )]

        # order is important, but we still want to discard repetitions
        properties = {}
        porder = []
        for prop in re_findall( '(.*?):(.*?)(;|$)', rule[1] ):
            key = prop[0].strip().lower()
            if key not in porder: porder.append( key )
            properties[ key ] = prop[1].strip()

    return css