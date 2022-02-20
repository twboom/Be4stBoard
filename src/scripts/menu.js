function menu() {
    function toggle() {
        const menu = document.getElementById('menu');

        if (menu.classList.contains('open')) { // Closing the menu
            menu.classList.remove('open');
            menu.classList.add('closed');

            document.body.style.overflow = 'hidden';
        } else { // Opening the menu
            menu.classList.remove('closed');
            menu.classList.add('open');

            document.body.style.overflow = 'visible';
        }

    }

    document.getElementById('menu-open').addEventListener('click', toggle);
    document.getElementById('menu-close').addEventListener('click', toggle);

}

menu();