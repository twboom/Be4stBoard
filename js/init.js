document.addEventListener('mousemove', _ => {
    if (!data.ready && data.sounds !== undefined) {
        createButtons()
        data.ready = true
    }
})