/* Code for page building */
const page = [];

page.build = function() {
    // Add elements to the page
    for (let i = 0; i< page.elements.length; i++) {
        const obj = page.elements[i];
        document.querySelectorAll(obj.parent).forEach(el => {
            el.innerHTML = obj.content
        })
    }
}