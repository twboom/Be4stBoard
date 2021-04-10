/* Code for page building */
const page = [];

page.config = { // Config
    "suffix": " | Be4stBoard",
    "menu": false
}

page.build = function() {
    // Add elements to the page
    for (let i = 0; i< page.elements.length; i++) {
        const obj = page.elements[i];
        document.querySelectorAll(obj.parent).forEach(el => {
            el.innerHTML = obj.content
        })
    }

    // Add event listeners
    document.getElementById('menu-open').addEventListener('click', page.menu);
    document.getElementById('menu-close').addEventListener('click', page.menu);

    // Add transitions
    const transitions = document.createElement('link');
    transitions.setAttribute('rel', 'stylesheet');
    transitions.setAttribute('href', 'css/transition.css')
    document.head.appendChild(transitions)

    // Add title suffix
    document.querySelectorAll('title').forEach(el => { el.innerHTML += page.config.suffix })

    // Add favion
    const link = document.createElement('link');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', 'favicon.ico')
    document.head.appendChild(link)
}

page.menu = function() {
    if (!page.config.menu) { // Show the menu
        document.body.style.overflow = 'hidden';
        document.getElementsByTagName('nav')[0].style.display = 'block';
        page.config.menu = true;
    }
    else if (page.config.menu) { // Hide the menu
        document.body.style.overflow = 'visible';
        document.getElementsByTagName('nav')[0].style.display = 'none';
        page.config.menu = false;
    }
}