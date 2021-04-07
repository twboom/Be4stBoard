let data = {};
data.ready = false;

// Fetching all the sounds
fetch(config.soundsList)
    .then(response => response.json())
    .then(json => data.sounds = json);

// Calculate correct volume
function calcVolume(volume) {
    if (volume === undefined) { volume = 1 };
    if (!(0 <= volume) || !(volume >= 1) ) { console.error(`Volume value must be in range [0,1]`); volume = 1 };
    return config.volume * volume
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
    const interface = new Audio(`assets/sounds/${sound.path}`);
    interface.volume = calcVolume(sound.volume);
    interface.play();
    console.log(`Played ${sound.name}`)
}