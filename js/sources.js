let data = {};
data.ready = false;

// Fetching all the sources
fetch('assets/data/sources.json')
    .then(response => response.json())
    .then(json => data.sources = json)

fetch('assets/data/sounds.json')
    .then(response => response.json())
    .then(json => data.sounds = json)

function createSections() {
    for (let i = 0; i < data.sources.length; i++) {
        const source = data.sources[i]

        // Creating section
        const section = document.createElement('section')

        // Giving section a title
        const title = document.createElement('h1')
        title.innerHTML = source.name
        section.appendChild(title)

        // Showing the clipper
        const clipper = document.createElement('p');
        clipper.innerHTML = `Clipped by: ${source.clipper}`;
        section.appendChild(clipper)

        // Linking to the soure
        if (source.available) { // Source is available
            const linkContainer = document.createElement('p');
            linkContainer.innerHTML = `Find it `;
            const link = document.createElement('a');
            link.setAttribute('href', source.link);
            link.innerText = `here`;
            linkContainer.appendChild(link);
            section.appendChild(linkContainer);
        }
        
        else {
            const text = document.createElement('p');
            text.innerHTML = `This source is unavailable!`
            section.appendChild(text)
        }

        // Adding the sound list
        const list = document.createElement('ul');
        // Adding the list items to the list
        for (x = 0; x < source.sounds.length; x++) {
            const li = document.createElement('li');
            const sound = data.sounds.find( ({ slug }) => slug === source.sounds[x])
            li.innerHTML = sound.name;
            list.appendChild(li);
        }
        section.appendChild(list)
        
        // Appending section to main element
        document.querySelector('main').appendChild(section)
    }
};

function getCountDisplay(value) {
    return document.getElementById(`${value}-count`)
}

function getUniqueClippers() {
    const clippers = new Set();
    for (item in data.sources) {
        clippers.add(data.sources[item].clipper)
    }
    return clippers.size
}

function setStats() {
    getCountDisplay('sound').innerHTML = data.sounds.length;
    getCountDisplay('source').innerHTML = data.sources.length;
    getCountDisplay('clipper').innerHTML = getUniqueClippers()
}

function init() {
    console.log(`INIT:  Starting initiation`)
    if (!data.ready && data.sources !== undefined && data.sounds !== undefined) {
        data.ready = true;

        // Creating sections
        createSections();

        // Setting stats
        setStats();
        
        // Misc initaion stuff

        // Removing eventlisteners for init
        document.removeEventListener('mousemove', init);
        document.removeEventListener('click', init);
        clearInterval(initInterval)
        console.log(`INIT:  Completed initiation`)
    }
    else {
        console.warn(`INIT:  Initiation failed (This is not an error)`)
    }
}
const initInterval = setInterval(init, 50)
document.addEventListener('mousemove', init)
document.addEventListener('click', init)