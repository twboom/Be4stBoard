page = {
    'assets': ['header', 'footer']
}

function build() {
    const assets = page.assets
    for (let i = 0; i < assets.length; i++) {
        fetch(`assets/html/${assets[i]}.html`)
            .then(response => response.text())
            .then(html => {
                document.querySelectorAll(assets[i]).forEach(el => {
                    el.innerHTML = html
                });
            })
    }
}

build()