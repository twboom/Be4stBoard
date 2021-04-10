/* Code for page building */
const page = [];

page.elements = [ // All elements
    {
        "name": "header-title",
        "tag": "h1",
        "attributes": [
            {
                "type": "class",
                "value": "header"
            },
            {
                "type": "id",
                "value": "menu-open"
            }
        ],
        "contents": [
            {
                "type": "innerHTML",
                "value": "Be4stBoard"
            }
        ]
    },
    {
        "name": "header-subtitle",
        "tag": "p",
        "attributes": [
            {
                "type": "class",
                "value": "header"
            }
        ],
        "contents": [
            {
                "type": "innerHTML",
                "value": "The Original Be4stSie Soundboard!"
            }
        ]
    }
];

page.layout = {
    "header": [
        {
            "name": "header-title"
        },
        {
            "name": "header-subtitle"
        }
    ]
}


// Page building

page.build = function() { // Build page

    // Create elements
    for (element in page.layout) {
        const contents = page.layout[element];
        const parent = document.createElement('div');
        const childs = page.build.element(contents);
        for (child in childs) {
            parent.appendChild(childs[child])
        }
        document.querySelectorAll(element).forEach(el => {
            el.appendChild(parent)
        })
    }

    // Load transition.css
    setTimeout(_ => {
        const transition = document.createElement('link');
        transition.setAttribute('rel', 'stylesheet');
        transition.setAttribute('href', 'css/transition.css')
        document.head.appendChild(transition)
    }, 100)
}

page.build.element = function(element) {
    const elements = [];
    for (obj in element) {
        obj = element[obj]
        obj = page.elements.find( ({ name }) => name == obj.name)
        elements.push(page.build.DOMObj(obj))
    }
    return elements
}

page.build.DOMObj = function(obj) {
    // Creating DOM element
    const el = document.createElement(obj.tag);

    // Setting attributes
    for (attribute in obj.attributes) {
        const att = obj.attributes[attribute]
        el.setAttribute(att.type, att.value)
    }

    // Setting contents
    for (content in obj.contents) {
        const con = obj.contents[content]
        
        // Different content types
        switch(con.type) {
            case "innerHTML":
                el.innerHTML += con.value
        }
    }

    return el
}