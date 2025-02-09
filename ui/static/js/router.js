
import { Home } from './views/Home.js';
import { About } from './views/About.js';
import { renderBefore } from './App.js';
import { Contact } from './views/Contact.js';

const routes = {
    '/': Home,
    '/about': About,
    '/contact': Contact,
};

export function router() {
    const path = window.location.pathname;
    const page = routes[path] || Home; 

    renderBefore(page());
}
