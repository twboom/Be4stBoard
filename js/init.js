function init() {
    console.log(`INIT:  Starting initiation`)
    if (!data.ready && data.sounds !== undefined) {

        // Creating buttons
        createButtons();
        data.ready = true;

        // Making inputs work
        document.getElementById('volume').addEventListener('input', evt => {
            const slider = evt.target;
            const display = document.getElementById('volume-display');
            display.innerHTML = slider.value * 10;
            updateConfig('volume', slider.value)
        })

        // Misc initaion stuff

        document.getElementById('volume-display').innerHTML = document.getElementById('volume').value * 10;
        updateConfig('volume', document.getElementById('volume').value)

        document.querySelector('h1.header').addEventListener('mouseover', _ => {
            data.volumeTimout = setTimeout(_ => {
                document.getElementById('volume').setAttribute('max', 1.1);
                console.log(`USER:  Set volume to 11`)
            }, 1000)
        })
        document.querySelector('h1.header').addEventListener('mouseout', _ => {
            clearTimeout(data.volumeTimout)
        })

        // Removing eventlisteners for init
        document.removeEventListener('mousemove', init);
        document.removeEventListener('click', init);
        clearInterval(initInterval)
        console.log(`INIT:  Completed initiation`)
    }
    else {
        console.warn(`INIT:  Initiation failed (This is not an error)`)
    }
}

const initInterval = setInterval(init, 50)
document.addEventListener('mousemove', init)
document.addEventListener('click', init)