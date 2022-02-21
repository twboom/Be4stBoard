from datetime import datetime
import json


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


# Load a JSON file
def json_load(path: str) -> dict:
    """
    Loads a JSON file
    :param path: The path to the JSON file
    :return: The JSON data
    """
    with open(path, 'r') as f:
        data = json.load(f)
    return data