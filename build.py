import sys
import os
from shutil import copytree, rmtree

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

            # Check for template usage
            source = source.split(':')
            if len(source) == 2:
                template = source[1]
                source = source[0]
            else:
                template = None
                source = source[0]

            # Add the page to the list
            pages.append({'source': source, 'target': target, 'template': template})
        

    # Build the pages
    print('[*] Building pages')
    for page in pages:
        build_page(page)

    # Copy assets
    print('[*] Copying assets')
    copytree('src/assets', 'build/assets')