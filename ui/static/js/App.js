
import { router } from './router.js';
import { Home } from './views/Home.js';
import { About } from './views/About.js';
import { Contact } from './views/Contact.js';


export function render(html) {
    const root = document.getElementById('root');
    root.insertAdjacentHTML('afterend',  html) ; 
    setupEventListeners();
}


export function renderBefore(html) {
    const root = document.getElementById('root');
    root.insertAdjacentHTML('afterend',  html) ; 
    setupEventListeners();
}

function setupEventListeners() {
    const root = document.getElementById('root');

    root.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' || event.target.tagName === 'A') {
            event.preventDefault();
            const action = event.target.getAttribute('data-action');
            if (action) {
                const actions = {
                    goToHome: () => render(Home()),
                    goToAbout: () => render(About()),
                    goToContact: () => render(Contact()),
                    // Agrega más acciones aquí...
                };

                if (actions[action]) {
                    actions[action]();
                }
            }
        }
    });
}


export function initApp() {

    router();
    window.onpopstate = render;
}



