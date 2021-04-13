/* Code for the soundboard */
const app = [];

/* Configs */

app.config = {
    "defaultDirectory": "assets/sounds",
    "json": "assets/data/data.json"
};

session = {
    "volume": 0.5
}

/* Logic */

fetch(app.config.json)
    .then(response => response.json())
    .then(json => {
        session.sounds = json;
        initiate(json.sounds);
    })

app.calcVolume = function(gain) {
    if (session.volume === 1.1) { return 1 };
    if (gain === undefined) { gain = 1 };
    let output = session.volume * gain;
    if (output < 0) { return 0 };
    if (output > 1) { return 1 };
    return output
}

// Code for buttons
app.Button = class {
    constructor(sound) {
        this.name = sound.name;
        this.extension = sound.extension;
        if (this.extension === undefined) { this.extension = 'mp3' };
        this.path = `${app.config.defaultDirectory}/${sound.slug}.${this.extension}`;
        this.volume = sound.volume;
        this.ctx = new Audio(this.path);
        this.btn = document.createElement('button');
        this.btn.innerHTML = this.name;
        this.btn.setAttribute('class', 'sound-button');
        this.btn.addEventListener('click', _ => {
            this.play()
        });
        if (this.volume === undefined) { this.volume = 1 }
    }

    create = function(container) {
        container.appendChild(this.btn)
    }

    play = function() {
        const volume = app.calcVolume(this.volume)
        this.ctx.volume = volume;
        this.ctx.play();    
        console.log(`(${utility.getTime()}) USER:  Played ${this.name} with volume ${volume * 10}`)
    }

    stop = function() {
        this.ctx.stop()
    }
}

// Code for board
app.Board = class {
    constructor(sounds) {
        this.sounds = sounds;
        this.buttons = [];
    }

    create = function(container) {
        container = document.querySelector(container)
        for (let i = 0; i < this.sounds.length; i++) {
            const btn = new app.Button(this.sounds[i]);
            btn.create(container)
            this.buttons.push(btn);
        }
    }
}

// Code for controllers

app.setVolume = async function(evt, init) {
    let slider = document.getElementById('volume')
    if (!init) { slider = evt.target; }
    const display = document.getElementById('volume-display');
    session.volume = parseInt(slider.value) / 100;
    display.innerText = parseInt(slider.value) / 10
}

// Initiate board

async function initiate(sounds) {
    // Starting timer
    const startTime = Date.now()

    // Creating board
    session.board = new app.Board(sounds);
    session.board.create('#sound-button-container');

    // Setting volume
    document.getElementById('volume').addEventListener('input', app.setVolume);
    app.setVolume(undefined, true);
    document.querySelector('a.header').addEventListener('mouseover', _ => {
        session.volumeTimout = setTimeout(_ => {
            document.getElementById('volume').setAttribute('max', 1.1);
            document.getElementById('volume').value = 1.1;
            session.volume = 1.1;
            document.getElementById('volume-display').innerText = 11;
        }, 1000)
    });
    document.querySelector('h1.header').addEventListener('mouseout', _ => {
        clearTimeout(session.volumeTimout);

    })

    // Stopping timer and evaluating
    const loadTime = Date.now() - startTime;
    console.log(`(${utility.getTime()}) BOARD:  Created board in ${loadTime} ms`)
}