
export function Footer() {
    return `
        <style>${footerStyles.footer}</style>
        <footer>
            <p>&copy; ${new Date().getFullYear()} Mi Aplicación</p>
        </footer>
    `;
}

const footerStyles = {
    footer: `
        footer {
            background-color: #f5f5f5;
            padding: 1rem 0;
            text-align: center;
            border-top: 1px solid #e0e0e0;
            font-size: 0.9rem;
            color: #666;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1000;
        }
        footer p {
            margin: 0;
            padding: 0;
        }
        
        /* Espacio para evitar que el contenido quede detrás del footer */
        body {
            padding-bottom: 70px;
        }
    `
};