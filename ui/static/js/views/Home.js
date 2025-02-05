
import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';

export function Home() {
    return `
        ${Header()}
        <div class="home">
            <h1>Bienvenido a la página de inicio</h1>
            <button data-action="goToAbout">Ir a About</button>
        </div>
        ${Footer()}
    `;
}

