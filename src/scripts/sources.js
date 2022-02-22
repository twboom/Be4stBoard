function sources() {

    function search(evt) {
        let query = evt.target.value;

        if (query != "") {
            query = query.toLowerCase();
            
            const sections = [...document.getElementsByClassName('source')];

            sections.forEach(section => {
                const samples = [...section.getElementsByClassName('sound-preview')];

                found = false;

                samples.forEach(sample => {
                    const name = sample.innerText.toLowerCase();
                    const slug = sample.dataset.src.replace('sounds/', '').split('.')[0];

                    if (name.includes(query) || slug.includes(query) || found) {
                        sample.parentElement.parentElement.style.display = 'block';
                        found = true;
                    } else {
                        sample.parentElement.parentElement.style.display = 'none';
                    };
                });
            })

        } else {
            const sections = [...document.getElementsByTagName('section')];

            sections.forEach(section => {
                section.style.display = 'block';
            });
        };
    };

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

        document.getElementById('search-bar').addEventListener('input', search);
    };

    init();

};

sources();