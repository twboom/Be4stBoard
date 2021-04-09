let data = {};
data.ready = false;

// Fetching all the sources
fetch('assets/data/sources.json')
    .then(response => response.json())
    .then(json => data.sounds = json)

function createSections() {
    for (let i = 0; i < data.sounds.length; i++) {
        const source = data.sounds[i]

        // Creating section
        const section = document.createElement('section')

        // Giving section a title
        const title = document.createElement('h1')
        title.innerHTML = source.name
        section.appendChild(title)

        // Linking to the soure
        const linkContainer = document.createElement('p');
        linkContainer.innerHTML = `Find it `;
        const link = document.createElement('a');
        link.setAttribute('href', source.link);
        link.innerText = `here`;
        linkContainer.appendChild(link);
        section.appendChild(linkContainer);

        // Adding the sound list
        const list = document.createElement('ul');
        // Adding the list items to the list
        for (x = 0; x < source.sounds.length; x++) {
            const li = document.createElement('li');
            li.innerHTML = source.sounds[x]
            list.appendChild(li)
        }
        section.appendChild(list)
        
        // Appending section to main element
        document.querySelector('main').appendChild(section)
    }
};

function init() {
    console.log(`INIT:  Starting initiation`)
    if (!data.ready && data.sounds !== undefined) {

        // Creating sections
        createSections();
        data.ready = true;

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