
import { router } from './router.js';

function render(html) {
    const root = document.getElementById('root');
    root.innerHTML = html; 
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

// Exportar la función para inicializar la aplicación
export function initApp() {
    // Renderizar la vista inicial
    router();

    // Manejar el evento de cambio de ruta
    window.onpopstate = router;
}



