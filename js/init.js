function init() {
    console.log(`Starting initiation`)
    if (!data.ready && data.sounds !== undefined) {
        createButtons();
        data.ready = true;
        document.removeEventListener('mousemove', init);
        document.removeEventListener('click', init);
        clearTimeout(initTimout)
        console.log(`Completed initiation`)
    }
    else {
        console.warn(`Initiation failed`)
    }
}
const initTimout = setTimeout(init, 500)
document.addEventListener('mousemove', init)
document.addEventListener('click', init)