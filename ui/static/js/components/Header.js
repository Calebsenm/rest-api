// components/Header.js
export function Header() {
    return `
        <header>
            <h1>Mi Aplicación</h1>
            <nav>
                <a href="/" data-action="goToHome">Home</a>
                <a href="/about" data-action="goToAbout">About</a>
                <a href="/contact" data-action="goToContact">Contact</a>
            </nav>
        </header>
    `;
}

