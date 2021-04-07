function init() {
    console.log(`Starting initiation`)
    if (!data.ready && data.sounds !== undefined) {
        createButtons();
        data.ready = true;
        document.removeEventListener('mousemove', init);
        console.log(`Completed initiation`)
    }
    else {
        console.warn(`Initiation failed`)
    }
}

document.addEventListener('mousemove', init)