function sources() {

    function init() {
        const triggers = [...document.getElementsByClassName('sound-preview')]
        triggers.forEach(trigger => {
            const audio = new Audio(trigger.dataset.src);
            audio.load()
            trigger.addEventListener('click', _ => {
                const audio = new Audio(trigger.dataset.src);
                const ctx = new AudioContext();
                const source = ctx.createMediaElementSource(audio);
                const gainNode = ctx.createGain();
                gainNode.gain.value = 1;
                source.connect(gainNode);
                gainNode.connect(ctx.destination)
                audio.play();
            })
        });
    };

    init();

};

sources();