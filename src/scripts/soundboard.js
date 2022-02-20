function soundboard() {
    let session = {
        'volume': 0.5,
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
            const gain = config.gain * session.volume;
            const audio = new Audio(config.src);
            const ctx = new AudioContext();
            const source = ctx.createMediaElementSource(audio);
            const gainNode = ctx.createGain();
            gainNode.gain.value = gain;
            source.connect(gainNode);
            gainNode.connect(ctx.destination)
            audio.play();
        });

        // Add to favorites
        button.addEventListener('contextmenu', _ => {

        });
        
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
    }

    init();
};

soundboard();