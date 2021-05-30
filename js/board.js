/* Code for the soundboard */
const app = [];

/* Configs */

app.config = {
    "defaultDirectory": "assets/sounds",
    "json": "assets/data/data.json",
};

session = {
    "volume": 0.5
};

app.ContextMenu = class {
    constructor(evt) {
        const sound = evt.target.dataset.sound;
        const favorites = session.favorites;

        const container = document.createElement('div');
        container.setAttribute('id', 'ctxmenu');
        container.style.left = evt.clientX + 'px';
        container.style.top = evt.clientY + 'px';

        // CTX Menu contents

            // Buttons
        const btnContainer = document.createElement('div');

            // Favorite button
        const favorite = document.createElement('button');
        favorite.setAttribute('class', 'ctx');
        if (!favorites.has(sound)) { favorite.innerText = 'Add to favorites'}
        else { favorite.innerText = 'Remove from favorites'};
        favorite.addEventListener('click', app.favorite)
        btnContainer.appendChild(favorite);
        
        container.appendChild(btnContainer);

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
    if (Number.isNaN(gain)) { gain = 1 };
    const output = gain * session.volume;
    return output;
}

// Code for buttons
app.Button = class {
    constructor(sound, favorite) {
        this.name = sound.name;
        this.extension = sound.extension;
        if (this.extension === undefined) { this.extension = 'mp3' };
        this.path = `${app.config.defaultDirectory}/${sound.slug}.${this.extension}`;
        this.volume = sound.volume;
        this.btn = document.createElement('button');
        this.btn.innerHTML = this.name;
        this.btn.setAttribute('class', 'sound-button');
        if (favorite) { this.btn.setAttribute('data-favorite', true)}
        this.btn.dataset.sound = sound.slug;
        this.btn.addEventListener('click', _ => {
            this.play()
        });
        this.btn.addEventListener('mouseover', _ => {
            const audio = new Audio(this.path);
            audio.load()
        })
        this.btn.addEventListener('contextmenu', evt => {
            evt.preventDefault();
            if (session.ctxMenu !== undefined) { document.getElementById('ctxmenu').remove() }
            session.ctxMenu = sound.slug;
            new app.ContextMenu(evt);
        })
        if (this.volume === undefined) { this.volume = 1 }
    }

    create = function(container) {
        container.appendChild(this.btn)
    }

    play = function() {
        const volume = app.calcVolume(this.volume);
        const audio = new Audio(this.path);
        const ctx = new AudioContext();
        const source = ctx.createMediaElementSource(audio);
        const gainNode = ctx.createGain();
        gainNode.gain.value = volume;
        source.connect(gainNode);
        gainNode.connect(ctx.destination)
        audio.play();
        console.log(`(${utility.getTime()}) USER:  Played ${this.name} with volume ${volume}`);
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

    create = function(board) {
        board = document.querySelector(board);
        for (let i = 0; i < this.sounds.length; i++) {
            const btn = new app.Button(this.sounds[i]);
            btn.create(board);
            this.buttons.push(btn);
        };
    }
}

// Code for favorites

app.Favorites = class {
    constructor() {
        this.favoButtons = [];
    };

    create = function(container) {
        container = document.querySelector(container);
        container.innerHTML = '';
        const favorites = [...session.favorites]
        for (let i = 0; i < favorites.length; i++) {
            const sound = session.sounds.sounds.find( ({ slug }) => slug === favorites[i] );
            const btn = new app.Button(sound, true);
            btn.create(container);
            this.favoButtons.push(btn);
        };
    };
};

app.favorite = function() {
    const sound = session.ctxMenu;

    // Adding / Removing from favorites
    switch(session.favorites.has(sound)) {
        case true:
            session.favorites.delete(sound)
            break;

        case false:
            session.favorites.add(sound)
            break;
    };

    // Updating page
    session.favoriteBoard.create('#favorite-container');

    // Writing back to storage
    preferences.set('favorite_sounds', [...session.favorites])
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
    if (favorites === undefined) { preferences.set('favorite_sounds', []) };
    session.favorites = new Set(favorites);

    // Creating board
    session.board = new app.Board(sounds);
    session.board.create('#sound-button-container');

    session.favoriteBoard = new app.Favorites(session.favorites);
    session.favoriteBoard.create('#favorite-container')

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