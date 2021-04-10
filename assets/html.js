/* HTML Templates */
page.elements = []

page.elements.push({ // Header
    "parent": "header",
    "content": `
    <h1 class="header"><a class="header" id="menu-open">Be4stBoard</a></h1>
    <p class="header">The original Be4stSie Soundboard!</p>
    `
})

page.elements.push({ // Footer
    "parent": "footer",
    "content": `
    <p class="footer">This app was made by <a href="https://thijsboom.com">Thijs Boom</a>!</p>
    <p class="footer">Find more info <a href="about.html">here</a>!</p>
    <p class="footer">Find the source code <a href="https://github.com/twboom/Be4stBoard">here</a>!</p>
    `
})

page.elements.push({ // Menu
    "parent": "nav",
    "content": `
    <div id="nav">
        <h1 class="nav"><a href="index.html" class="nav">Menu</a></h1>
            <ul class="nav">
                <li><a href="index.html">Board</a> - The soundboard</li>
                <li><a href="sources.html">Sources</a> - Find the sources of the sounds and some statistics!</li>
                <li><a href="about.html">About</a> - About this app and more information</li>
            </ul>
        <button class="nav" id="menu-close">Close</button>
    </div>
    `
})