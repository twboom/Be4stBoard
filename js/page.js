/* Code for page building */
const page = [];

page.config = { // Config
    "suffix": " | Be4stBoard",
    "menu": false
}

page.build = async function() {
    const startTime = Date.now()

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

    const loadTime = Date.now() - startTime
    console.log(`(${utility.getTime()}) PAGE:  Finished page loading in ${loadTime} ms`)
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

/* General utility code */
utility =[];

// Get now time, but nicely formatted
utility.getTime = function() {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ms = now.getMilliseconds();
    return `${hours}:${minutes}:${seconds}, ${ms}ms`
}