function init() {
    console.log(`Starting initiation`)
    if (!data.ready && data.sounds !== undefined) {

        // Creating buttons
        createButtons();
        data.ready = true;

        // Making inputs work
        document.getElementById('volume').addEventListener('input', evt => {
            const slider = evt.target;
            const display = document.getElementById('volume-display');
            display.innerHTML = slider.value;
            updateConfig('volume', slider.value)
        })

        // Misc initaion stuff

        document.getElementById('volume-display').innerHTML = document.getElementById('volume').value

        // Removing eventlisteners for init
        document.removeEventListener('mousemove', init);
        document.removeEventListener('click', init);
        clearInterval(initInterval)
        console.log(`Completed initiation`)
    }
    else {
        console.warn(`Initiation failed`)
    }
}
const initInterval = setInterval(init, 50)
document.addEventListener('mousemove', init)
document.addEventListener('click', init)