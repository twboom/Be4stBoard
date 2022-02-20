def html(code) -> str:
    code = code.replace('\n', '')
    code = code.replace('\t', '')
    code = code.replace('  ', '')

    return code