// views/About.js
import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';

export function About() {
    return `
        ${Header()}
        <div class="about">
            <h1>Acerca de nosotros</h1>
            <p>Esta es la página de about.</p>
            <button data-action="goToHome">Volver a Home</button>
        </div>
        ${Footer()}
    `;
}

