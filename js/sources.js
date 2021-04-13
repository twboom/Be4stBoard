/* Sources list code */

const sources = [];
const stats = [];

let data = {};

// Fetching all the sources
fetch('assets/data/data.json')
    .then(response => response.json())
    .then(json => {
        data = json;
        initiate()
    })

sources.Source = class{
    constructor(source) {
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
            if (source.platform !== undefined) {
                linkContainer.innerHTML += ` on ${source.platform.charAt(0).toUpperCase() + source.platform.slice(1)}!`
            }
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
        for (let x = 0; x < source.sounds.length; x++) {
            const li = document.createElement('li');
            const sound = data.sounds.find( ({ slug }) => slug === source.sounds[x])
            li.innerHTML = sound.name;
            list.appendChild(li);
        }
        section.appendChild(list)
        return section
    }
}

sources.createSources = function () {
    for (let i = 0; i < data.sources.length; i++) {
        const source = data.sources[i];

        // Creating section
        const section = new sources.Source(source)
        
        // Appending section to main element
        document.querySelector('main').appendChild(section)
    }
}

stats.uniqueClippers = function() {
    const clippers = new Set();
    for (item in data.sources) {
        clippers.add(data.sources[item].clipper)
    }
    return clippers.size
}

stats.setStats = function() {
    document.getElementById(`sound-count`).innerHTML = data.sounds.length;
    document.getElementById(`source-count`).innerHTML = data.sources.length;
    document.getElementById(`clipper-count`).innerHTML = stats.uniqueClippers()
}

async function initiate() {
    sources.createSources();
    stats.setStats();
}