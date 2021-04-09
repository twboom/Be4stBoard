let data = {};
data.ready = false;

// Fetching all the sounds
fetch('assets/data/sounds.json')
    .then(response => response.json())
    .then(json => data.sounds = json);

// Calculate correct volume
function calcVolume(volume) {
    if (volume === undefined) { volume = 1 };
    let output = config.volume * volume;
    if (output < 0) { output = 0 };
    if (output > 1) { output = 1 };
    return output;
}

// Creating the buttons
function createButtons() {
    const sounds = data.sounds;
    const container = document.getElementById('buttons');
    for (let i = 0; i < sounds.length; i++) {
        const sound = sounds[i];
        const btn = document.createElement('button');
        btn.setAttribute('data-sound', sound.name);
        btn.setAttribute('class', 'sound-button')
        btn.addEventListener('click', play);
        btn.innerHTML = sound.name;
        container.appendChild(btn);
        console.log(`Created button ${sound.name}`);
    };
};

function play(evt) {
    const soundName = evt.target.getAttribute('data-sound');
    const sound = data.sounds.find( ({ name }) => name == soundName);
    const path = `${config.soundLocation}/${sound.slug}.${sound.extension}`
    const interface = new Audio(path);
    interface.volume = calcVolume(sound.volume);
    interface.play();
    console.log(`Played ${sound.name}`)
}

function updateConfig(target, value) {
    config[target] = parseFloat(value);
}