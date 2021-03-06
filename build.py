import sys
import os
from shutil import copytree, rmtree, copyfile
from renderer.api import api

from renderer.page import build_page


# Main script
if __name__ == '__main__':
    print('')

    print('[*] Starting build script')
    
    # Get build target
    if len(sys.argv) == 1:
        print('[*] No build target specified, using default (production)')
        build_target = '-p'
    else:
        build_target = sys.argv[1]

    # Check for build folder
    if not os.path.exists('build'):
        print('[*] Creating build folder')
        os.mkdir('build')
    else: # Clear build folder
        print('[*] Clearing build folder')
        rmtree('build')
        os.mkdir('build')


    # Read the config file
    print('[*] Reading config file')
    with open('config/pages.config', 'r') as f:
        lines = f.read().splitlines()

        pages = [] # List of the pages to build

        # Parse the config file
        for line in lines:
            # Split the line into instructions
            instructions = line.split('->')
            source = instructions[0]
            target = instructions[1]

            # Check for title
            target = target.split('|')
            if len(target) == 2:
                title = target[1]
                target = target[0]
            else:
                title = target[0]
                target = target[0]

            # Check for template usage
            source = source.split(':')
            if len(source) == 2:
                template = source[1]
                source = source[0]
            else:
                template = None
                source = source[0]

            # Add the page to the list
            pages.append({'source': source, 'target': target, 'template': template, 'title': title})
        

    # Build the pages
    print('[*] Building pages')
    for page in pages:
        build_page(page)

    # Copy assets
    print('[*] Copying assets')
    copytree('src/assets', 'build/assets')

    # Copy scripts
    print('[*] Copying scripts')
    copytree('src/scripts', 'build/scripts')

    # Copy sounds
    print('[*] Copying sounds')
    copytree('data/sounds', 'build/sounds')

    # Add _headers
    print('[*] Adding headers')
    copyfile('config/_headers', 'build/_headers')

    # Build API
    print('[*] Building API')
    os.mkdir('build/api')
    api()