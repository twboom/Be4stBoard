/* Code for page building */
const page = [];

page.config = { // Config
    "suffix": " | Be4stBoard",
    "menu": false
}

page.build = async function() {
    const startTime = Date.now();

    // Add general elements
    new elements.Header(document.getElementsByTagName('header')[0]);
    new elements.Footer(document.getElementsByTagName('footer')[0]);
    new elements.Nav(document.getElementsByTagName('nav')[0],utility.checkStorage('localStorage'));

    // Add event listeners
    document.getElementById('menu-open').addEventListener('click', page.menu);
    document.getElementById('menu-close').addEventListener('click', page.menu);

    // Add transitions
    const transitions = document.createElement('link');
    transitions.setAttribute('rel', 'stylesheet');
    transitions.setAttribute('href', 'css/transition.css');
    document.head.appendChild(transitions);

    // Add title suffix
    document.querySelectorAll('title').forEach(el => { el.innerHTML += page.config.suffix });

    // Add favion
    const link = document.createElement('link');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', 'favicon.ico');
    document.head.appendChild(link);

    // Initiate preferences
    preferences.init()

    const loadTime = Date.now() - startTime;
    console.log(`(${utility.getTime()}) PAGE:  Finished page loading in ${loadTime} ms`);
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

// Auxilary code
page.appendElements = function(parent, objs) {
    for (obj in objs) {
        parent.appendChild(objs[obj])
    }
}

/* Preferences */
const preferences = [];
preferences.prefs = {};

preferences.set = function(key, value) {
    // Get data from local storage
    let prefs = JSON.parse(localStorage.preferences);
    console.log(prefs)

    // Set the value
    prefs[key] = value;

    // Remove undefined stuff from object
    Object.keys(prefs).forEach(key => prefs[key] === undefined ? delete prefs[key] : {});

    // Write back to local storage
    localStorage.preferences = JSON.stringify(prefs)
}

preferences.init = function() {
    const prefs = localStorage.preferences;
    
}


/* General utility code */
utility = [];

// Get now time, but nicely formatted
utility.getTime = function() {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ms = now.getMilliseconds();
    return `${hours}:${minutes}:${seconds}, ${ms}ms`
}

// Get storage API availability
utility.checkStorage = function(type) { // From: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}