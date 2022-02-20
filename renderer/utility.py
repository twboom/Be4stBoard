from datetime import datetime


# Generate and append time stamp to the page
def append_time(page) -> str:
    """
    Appends the current time to the page
    :param page: The page to append the time to
    :return: The page with the time appended
    """
    time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    timezone = datetime.now().astimezone().tzinfo
    content = f'Generated this file at {time} ({timezone})'
    comment = f'<!-- {content} -->'
    return page + comment