let data = {};
data.ready = false;

// Fetching all the sounds
fetch(config.soundsList)
    .then(response => response.json())
    .then(json => data.sounds = json)

// Creating the buttons
function createButtons() {
    const sounds = data.sounds
    const container = document.getElementById('buttons')
    for (let i = 0; i < sounds.length; i++) {
        const sound = sounds[i]
        console.log(sound)
        const btn = document.createElement('button')
        btn.setAttribute('data-sound', sound.name)
        btn.addEventListener('click', _ => {})
        container.appendChild(btn)
        console.log(`Created button ${sound.name}`)
    }
}