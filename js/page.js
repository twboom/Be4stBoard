const config = {
    'soundsList': 'assets/data/sounds.json',
    'soundLocation': 'assets/sounds',
    'titleSuffix': ' | Be4stBoard',
    'volume': 1
};

page = {
    'assets': ['header', 'footer'],
    'links': [
        {
            'extension': 'css',
            'directory': 'css/',
            'location': 'head',
            'tag': 'link',
            'linkType': 'href',
            'attributes': [
                {
                    'type': 'rel',
                    'value': 'stylesheet'
                }
            ],
            'files': ['common', 'responsive', 'fonts']
        },
        {
            'extension': 'ico',
            'directory': '',
            'location': 'head',
            'tag': 'link',
            'linkType': 'href',
            'attributes': [
                {
                    'type': 'rel',
                    'value': 'shortcut icon'
                },
                {
                    'type': 'type',
                    'value': 'image/x-icon'
                }
            ],
            'files': ['favicon']
        }
    ]
}

function build() {
    // Adding pieces of HTML to the page
    for (let i = 0; i < page.assets.length; i++) {
        const asset = page.assets[i]
        fetch(`assets/html/${asset}.html`)
            .then(response => response.text())
            .then(html => {
                document.querySelectorAll(asset).forEach(el => {
                    el.innerHTML = html
                });
            });
    };

    // Adding correct links to the page
    for (let i = 0; i < page.links.length; i++) {
        const category = page.links[i]
        for (let x = 0; x < category.files.length; x++) {
            const element = document.createElement(category.tag);
            const name = `${category.directory}${category.files[x]}.${category.extension}`

            // Setting correct attributes
            for (let y = 0; y < category.attributes.length; y++) {
                element.setAttribute(category.attributes[y].type, category.attributes[y].value)
            };

            // Setting link to file
            element.setAttribute(category.linkType, name)

            // Appending element to all the correct locations
            document.querySelectorAll(category.location).forEach(item => {
                item.appendChild(element)
            })
        };
    };

    // Adding the correct title suffix
    document.querySelector('title').innerHTML += config.titleSuffix;
};

build()