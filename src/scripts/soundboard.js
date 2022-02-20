function soundboard() {
    buttons = [...document.getElementsByClassName('sound-button')];

    buttons.forEach(button => initButton(button));
    
    function initButton(button) {
        const config = {
            'src': button.dataset.src,
            'volume': button.dataset.volume,
        }

        console.log(initButton, config);

        const audio = new Audio(config.src);
        audio.load()

        button.addEventListener('click', _ => {
            playsound(config);
        });

        
    }

    function playsound({src, volume}) {
        volume = 1;
        const audio = new Audio(src);
        const ctx = new AudioContext();
        const source = ctx.createMediaElementSource(audio);
        const gainNode = ctx.createGain();
        gainNode.gain.value = volume;
        source.connect(gainNode);
        gainNode.connect(ctx.destination)
        audio.play();
    }
};

soundboard();