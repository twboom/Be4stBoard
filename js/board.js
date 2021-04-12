/* Code for the soundboard */
const app = [];

/* Configs */

app.config = {
    "defaultDirectory": "assets/sounds",
    "json": "assets/data/sounds.json"
};

session = {
    "volume": 0.5
}

/* Logic */

fetch(app.config.json)
    .then(response => response.json())
    .then(json => {
        session.sounds = json;
        initiate(json);
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
const Button = class {
    constructor(sound) {
        this.name = sound.name;
        this.path = `${app.config.defaultDirectory}/${sound.slug}.${sound.extension}`;
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
const Board = class {
    constructor(sounds) {
        this.sounds = sounds;
        this.buttons = [];
    }

    create = function(container) {
        container = document.querySelector(container)
        for (let i = 0; i < this.sounds.length; i++) {
            const btn = new Button(this.sounds[i]);
            btn.create(container)
            this.buttons.push(btn);
        }
    }
}

// Code for controllers

const setVolume = async function(evt, init) {
    let slider = document.getElementById('volume')
    if (!init) { slider = evt.target; }
    const display = document.getElementById('volume-display');
    session.volume = parseFloat(slider.value);
    display.innerText = Math.round(slider.value * 10 * 10 ) / 10;
}

// Initiate board

async function initiate(sounds) {
    const startTime = Date.now()
    session.board = new Board(sounds);
    session.board.create('#sound-button-container');
    document.getElementById('volume').addEventListener('input', setVolume);
    setVolume(undefined, true);
    document.querySelector('h1.header').addEventListener('mouseover', _ => {
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
    const loadTime = Date.now() - startTime;
    console.log(`(${utility.getTime()}) BOARD:  Created board in ${loadTime} ms`)
}