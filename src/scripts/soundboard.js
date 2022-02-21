function soundboard() {
    const favorites = document.getElementById('favorite-container');

    let session = {
        'volume': 0.5,
        'favorites': [],
    };
    
    function initButton(button) {
        const config = {
            'src': button.dataset.src, // Path of the sound file
            'gain': button.dataset.volume, // Gain of the sound to equalize the volume
        };

        // Preload the sample
        const audio = new Audio(config.src);
        audio.load()

        // Play the sample
        button.addEventListener('click', _ => {
            playSound(config)
        });

        // Add to favorites
        button.addEventListener('contextmenu', showContextmenu);
        
    }

    function playSound({src, gain}) {
        gain *= session.volume;
        const audio = new Audio(src);
        const ctx = new AudioContext();
        const source = ctx.createMediaElementSource(audio);
        const gainNode = ctx.createGain();
        gainNode.gain.value = gain;
        source.connect(gainNode);
        gainNode.connect(ctx.destination)
        audio.play();
    };

    function showContextmenu(evt) {
        evt.preventDefault();
        [...document.getElementsByClassName('contextmenu')].forEach(btn => { btn.remove() });
        const button = evt.target;
        const config = {
            'src': button.dataset.src, // Path of the sound file
            'gain': button.dataset.volume, // Gain of the sound to equalize the volume
        };

        let buttonText = 'Add to favorites';
        if (evt.target.dataset.favorite != undefined) {
            buttonText = 'Remove from favorites';
        };

        const container = document.createElement('div');
        container.className = 'contextmenu';
        const innerContainer = document.createElement('div');
        const favoriteButton = document.createElement('button');
        favoriteButton.innerText = buttonText;
        favoriteButton.classList.add('ctx');
        innerContainer.appendChild(favoriteButton);
        container.appendChild(innerContainer);
        document.body.appendChild(container);
        favoriteButton.addEventListener('click', _ => {
            toggleFavorite(config, button);
            container.remove();
        })

        container.style.top = evt.clientY + 'px';
        container.style.left = evt.clientX + 'px';
        container.style.position = 'absolute';
    }

    function toggleFavorite({src, gain}, button) {
        if (session.favorites.includes(src)) {
            session.favorites.splice(session.favorites.indexOf(src), 1);
        } else {
            session.favorites.push(src);
        };

        if (button.dataset.favorite == 'true') {
            button.dataset.favorite = 'false';
            button.remove();
        } else {
            clone = button.cloneNode(true);
            clone.dataset.favorite = 'true';
            clone.addEventListener('click', _ => {
                playSound({src, gain})
            });
            clone.addEventListener('contextmenu', showContextmenu);
            favorites.appendChild(clone);
        }
    }

    function setVolume() {
        const slider = document.getElementById('volume-slider');
        const display = document.getElementById('volume-display');
        session.volume = parseInt(slider.value) / 100;
        display.innerHTML = parseInt(slider.value) / 10;
        if (slider.value <= 100 && slider.getAttribute('max', 110)) { slider.setAttribute('max', 100) }
    }

    function init() {
        // Volume slider
        document.getElementById('volume-slider').addEventListener('input', setVolume);
        setVolume();

        // Sound buttons
        buttons = [...document.getElementsByClassName('sound-button')];
        buttons.forEach(button => initButton(button));

        // Remove the context menu
        document.addEventListener('click', _ => {
            [...document.getElementsByClassName('contextmenu')].forEach(btn => { btn.remove() });
        });
    }

    init();
};

soundboard();