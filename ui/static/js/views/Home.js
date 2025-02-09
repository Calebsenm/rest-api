
import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';

export function Home() {
    return `
        ${Header()}
        <div class="home">
            <h1>Home</h1>
        </div>
        ${Footer()}
    `;
}

