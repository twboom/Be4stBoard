/* Code for the soundboard */
const app = [];

/* Configs */

app.config = {
    "defaultDirectory": "assets/sounds",
    "json": "assets/data/data.json"
};

session = {
    "volume": 0.5
};

app.ContextMenu = class {
    constructor(evt) {
        const container = document.createElement('div');
        container.setAttribute('id', 'ctxmenu');
        container.style.left = evt.clientX + 'px';
        container.style.top = evt.clientY + 'px';
        console.log(evt.clientX)

        const title = document.createElement('p');
        title.innerText = evt.target.dataset.sound;
        container.appendChild(title);

        // Deleting ctxmenu
        document.addEventListener('click', evt => {
            if (evt.target !== container) { container.remove(); session.ctxMenu = undefined };
        });
        document.body.appendChild(container);
    };
};

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
        this.btn = document.createElement('button');
        this.btn.innerHTML = this.name;
        this.btn.setAttribute('class', 'sound-button');
        this.btn.dataset.sound = sound.slug;
        this.btn.addEventListener('click', _ => {
            this.play()
        });
        this.btn.addEventListener('contextmenu', evt => {
            evt.preventDefault();
            if (session.ctxMenu === sound.slug) { return };
            if (session.ctxMenu !== undefined) { document.getElementById('ctxmenu').remove() }
            session.ctxMenu = sound.slug;
            new app.ContextMenu(evt);
            console.log(evt.target);
        })
        if (this.volume === undefined) { this.volume = 1 }
    }

    create = function(container) {
        container.appendChild(this.btn)
    }

    play = function() {
        const ctx = new Audio(this.path)
        const volume = app.calcVolume(this.volume)
        ctx.volume = volume;
        ctx.play();    
        console.log(`(${utility.getTime()}) USER:  Played ${this.name} with volume ${volume * 10}`)
    }

    stop = function() {
        this.ctx.stop()
    }
}

// Code for board
app.Board = class {
    constructor(sounds, favorites) {
        this.sounds = sounds;
        this.buttons = [];
        this.favoButtons = [];
        this.favorites = favorites;
    }

    create = function(board, favorites) {
        board = document.querySelector(board);
        for (let i = 0; i < this.sounds.length; i++) {
            const btn = new app.Button(this.sounds[i]);
            btn.create(board);
            this.buttons.push(btn);
        };

        favorites = document.querySelector(favorites);
        for (let i = 0; i < this.favorites; i++) {
            const sound = this.sounds.find( ({ name }) => name === this.favorites[i].name );
            const btn = new app.Button(sound);
            btn.create(favorites);
            this.favoButtons.push(btn);
        }
    }
}

// Code for controllers

app.setVolume = async function(evt, init) {
    let slider = document.getElementById('volume');
    if (!init) { slider = evt.target; };
    const display = document.getElementById('volume-display');
    session.volume = parseInt(slider.value) / 100;
    display.innerText = parseInt(slider.value) / 10;
    if (slider.value <= 100 && slider.getAttribute('max', 110)) { slider.setAttribute('max', 100) }
}

// Initiate board

async function initiate(sounds) {
    // Starting timer
    const startTime = Date.now();

    // Getting favorites
    let favorites = preferences.get('favorite_sounds');
    if (favorites === undefined) { preferences.set('favorite_sounds', []); favorites = [] };

    // Creating board
    session.board = new app.Board(sounds, favorites);
    session.board.create('#sound-button-container');

    // Setting volume
    document.getElementById('volume').addEventListener('input', app.setVolume);
    app.setVolume(undefined, true);
    document.querySelector('a.header').addEventListener('mouseover', _ => {
        session.volumeTimout = setTimeout(_ => {
            document.getElementById('volume').setAttribute('max', 110);
            document.getElementById('volume').value = 110;
            session.volume = 1.1;
            document.getElementById('volume-display').innerText = 11;
            console.log(`Well done! You've just set the volume to 11!`)
        }, 1000)
    });
    document.querySelector('h1.header').addEventListener('mouseout', _ => {
        clearTimeout(session.volumeTimout);
    });
    
    // More event listeners
    document.addEventListener('contextmenu', evt => {

    })

    // Stopping timer and evaluating
    const loadTime = Date.now() - startTime;
    console.log(`(${utility.getTime()}) BOARD:  Created board in ${loadTime} ms`)
}