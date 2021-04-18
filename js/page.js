/* Code for page building */
const page = [];

page.config = { // Config
    "suffix": " | Be4stBoard",
    "menu": false
};

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
    preferences.init();

    const loadTime = Date.now() - startTime;
    console.log(`(${utility.getTime()}) PAGE:  Finished page loading in ${loadTime} ms`);
};

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
    };
};

// Auxilary code
page.appendElements = function(parent, objs) {
    for (obj in objs) {
        parent.appendChild(objs[obj]);
    };
};

/* Preferences */
const preferences = [];

preferences.set = function(key, value) {
    // Get data from local storage
    let prefs = JSON.parse(localStorage.preferences);

    // Set the value
    prefs[key] = value;

    // Remove undefined stuff from object
    Object.keys(prefs).forEach(key => prefs[key] === undefined ? delete prefs[key] : {});

    // Return if key is undefined
    if (key === undefined) { return };

    // Log to console
    console.log(`(${utility.getTime()}) PREFERENCES:  Set item '${key}' to '${value}'`);

    // Write back to local storage
    localStorage.preferences = JSON.stringify(prefs);
}

preferences.get = function(key) {
    // Get data from local storage
    const prefs = JSON.parse(localStorage.preferences);

    // Return correct data
    return prefs[key];
}

preferences.init = function() {
    const prefs = localStorage.preferences;

    // Setting preferences obj if undefined
    if (prefs === undefined) {
        localStorage.setItem('preferences', '{}');
        console.log(`(${utility.getTime()}) PREFERENCES:  Preferences not found`);
        return
    };


    try {
        JSON.parse(prefs);
    }
    catch(e) {
        console.warn(`(${utility.getTime()}) PREFERENCES:  Error found in preferences, resetting preferences`);
        localStorage.setItem('preferences', '{}')
    };
};

/* General utility code */
utility = [];

// Get now time, but nicely formatted
utility.getTime = function() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ms = now.getMilliseconds();
    return `${hours}:${minutes}:${seconds}, ${ms}ms`;
};

// DARK MODE RULEZZ
utility.darkMode = function() {
    let mode = preferences.get('dark_mode');

    if (mode === undefined) {
        preferences.set('dark_mode', false);
        mode = false
    };

    const style = document.documentElement.style;

    switch(mode) {
        case true: // Was true, now disabling
            
            // Set properties
            style.setProperty('--background-color', '#ffffff'); // Background color
            style.setProperty('--text-color', '#000000') // Text color
            style.setProperty('--shadow', 'drop-shadow(0 0 10px #313131)') // Drop shadow

            // Change state
            preferences.set('dark_mode', false)
            break;

        case false: // Was false, now enabling

            // Set properties
            style.setProperty('--background-color', '#060606'); // Background color
            style.setProperty('--text-color', '#ffffff') // Text color
            style.setProperty('--shadow', 'drop-shadow(0 0 10px #000000)') // Drop shadow

            // Change state
            preferences.set('dark_mode', true)
            break;
    }
}

// Get storage API availability
utility.checkStorage = function(type) { // From: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    let storage;
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
    };
};