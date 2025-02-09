
export function Header() {
    return `
        <style>${headerStyles.header}</style>
        <header>
            <h1> App </h1>
            <nav>
                <a href="/" data-action="goToHome">Home</a>
                <a href="/about" data-action="goToAbout">Registrar</a>
                <a href="/contact" data-action="goToContact">Contactos</a>
            </nav>
        </header>
    `;
}

const headerStyles = {
    header: `
        header {
            background: #ffffff;
            padding: 1.5rem 2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            position: sticky;
            top: 0;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        header h1 {
            margin: 0;
            color: #2d3748;
            font-size: 1.5rem;
            font-weight: 600;
        }

        header nav {
            display: flex;
            gap: 2rem;
        }

        header nav a {
            color: #4a5568;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            padding: 0.5rem 0;
            position: relative;
        }

        header nav a:hover {
            color: #48bb78;
            transform: translateY(-2px);
        }

        header nav a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: #48bb78;
            transition: width 0.3s ease;
        }

        header nav a:hover::after {
            width: 100%;
        }

        header nav a[data-action]:active {
            transform: translateY(0);
        }

        @media (max-width: 768px) {
            header {
                flex-direction: column;
                gap: 1rem;
                padding: 1rem;
            }
            
            header nav {
                flex-wrap: wrap;
                gap: 1rem;
                justify-content: center;
            }
        }
    `
};