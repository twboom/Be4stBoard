const config = {
    'soundsList': 'assets/data/sounds.json',
    'soundLocation': 'assets/sounds',
    'titleSuffix': ' | Be4stBoard',
    'menu': true,
    'toDo': undefined,
    'volume': 1
};

page = {
    'assets': ['header', 'footer', 'nav'],
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
            'files': ['common', 'responsive', 'fonts', 'scrollbar']
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
    ],
    'menu': []
}

function build() {
    // Adding pieces of HTML to the page
    page.toDo = page.assets.length;
    for (let i = 0; i < page.assets.length; i++) {
        const asset = page.assets[i]
        fetch(`assets/html/${asset}.html`)
            .then(response => response.text())
            .then(html => {
                document.querySelectorAll(asset).forEach(el => {
                    el.innerHTML = html
                });
                page.toDo--
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

    // Setting eventlisteners
    const listenerInterval = setInterval(_ => {
        if (page.toDo === 0) {
            addListeners; clearInterval(listenerInterval);

            let thisPage = document.URL.split('/');
            thisPage = thisPage[thisPage.length - 1]

            if(thisPage === '' || thisPage.includes('index')) {
                volumeHeaderInit()
            }
        }
    }, 100)

    // Adding the correct title suffix
    document.querySelector('title').innerHTML += config.titleSuffix;
};

function addListeners() {
    document.getElementById('menu-open').addEventListener('click', menu)
    document.getElementById('menu-close').addEventListener('click', menu)
}

function menu() {
    if (config.menu) { // Show the menu
        document.body.style.overflow = 'hidden';
        document.getElementsByTagName('nav')[0].style.display = 'block';
        config.menu = false;
    }
    else if (!config.menu) { // Hide the menu
        document.body.style.overflow = 'visible';
        document.getElementsByTagName('nav')[0].style.display = 'none';
        config.menu = true;
    }
}

build()