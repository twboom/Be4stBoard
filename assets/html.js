/* Page Elements Templates */
elements = [];

// Menu links
elements.menu = [
    {
        "name": "Board",
        "description": "The soundboard",
        "link": "index.html"
    },
    {
        "name": "Sources",
        "description": "Find the sources of the sounds and some statistics!",
        "link": "sources.html"
    },
    {
        "name": "About",
        "description": "About and info page",
        "link": "about.html"
    }
]

elements.Header = class { // Header
    constructor(parent) {
        // Title container
        const title = document.createElement('h1');
        title.setAttribute('class', 'header');
        
        // Title text
        const titleText = document.createElement('a');
        titleText.setAttribute('class', 'header');
        titleText.setAttribute('id', 'menu-open');
        titleText.innerText = 'Be4stBoard';
        title.appendChild(titleText)

        // Subtitle
        const subtitle = document.createElement('p');
        subtitle.setAttribute('class', 'header');
        subtitle.innerText = 'The Original Be4stSie Soundboard!'

        // Put elements on screen
        page.appendElements(parent, [title, subtitle])
    }
}

elements.Footer = class { // Footer
    constructor(parent) {
        // Maker, It's A Me :)
            // Text
        const maker = document.createElement('p');
        maker.setAttribute('class', 'footer');
        maker.innerHTML += 'This app was made by ';
            // Link
        const makerLink = document.createElement('a');
        makerLink.setAttribute('href', 'https://thijsboom.com');
        makerLink.innerHTML = 'Thijs Boom';
        maker.appendChild(makerLink);

        // More info
            // Text
        const info = document.createElement('p');
        info.setAttribute('class', 'footer');
        info.innerHTML = 'Find more info ';
            // Link
        const infoLink = document.createElement('a');
        infoLink.setAttribute('href', 'about.html');
        infoLink.innerHTML = 'here';
        info.appendChild(infoLink);

        // Source code
            // Text
        const source = document.createElement('p');
        source.setAttribute('class', 'footer');
        source.innerHTML = 'Find the source code ';
            // Link
        const sourceLink = document.createElement('a');
        sourceLink.setAttribute('href', 'https://github.com/twboom/be4stboard');
        sourceLink.innerHTML = 'here';
        source.appendChild(sourceLink);

        page.appendElements(parent, [maker, info, source])
    }
}

elements.Nav = class {
    constructor(parent, preferences) {
        const nav = document.createElement('div');
        nav.setAttribute('id', 'nav');

        const title = document.createElement('h1');
        title.setAttribute('class', 'nav');
        const titleContent = document.createElement('a')
        titleContent.setAttribute('class', 'nav');
        titleContent.setAttribute('href', 'index.html');
        titleContent.innerText = 'Menu'
        title.appendChild(titleContent);
        nav.appendChild(title)

        const list = document.createElement('ul');
        list.setAttribute('class', 'nav');
        // Set links
        for (let link in elements.menu) {
            link = elements.menu[link];
            const li = document.createElement('li');
            const obj = document.createElement('a');

            obj.innerText = link.name;
            obj.setAttribute('href', link.link)

            li.appendChild(obj);

            li.innerHTML += ` - ${link.description}`

            list.appendChild(li);
        };
        nav.appendChild(list);

        // Config / Preferences
        const prefContainer = document.createElement('div');
        prefContainer.setAttribute('class', 'nav');
        
        const prefHeader = document.createElement('h2');
        prefHeader.innerText = 'Preferences';
        prefContainer.appendChild(prefHeader);

        // Dark mode
        const darkMode = document.createElement('input');
        darkMode.setAttribute('type', 'checkbox');
        darkMode.setAttribute('name', 'dark_mode');
        darkMode.setAttribute('id', 'dark_mode');
        darkMode.addEventListener('click', _ => {
            utility.darkMode()
        })
        const darkModeLabel = document.createElement('label');
        darkModeLabel.setAttribute('for', 'dark_mode');
        darkModeLabel.innerText = 'Dark Mode';
        prefContainer.appendChild(darkMode);
        prefContainer.appendChild(darkModeLabel);

        nav.appendChild(prefContainer);

        // Close button
        const btn = document.createElement('button');
        btn.setAttribute('class', 'nav');
        btn.setAttribute('id', 'menu-close')
        btn.innerText = 'Close'
        nav.appendChild(btn)

        page.appendElements(parent, [nav])
    }
}