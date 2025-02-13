import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';

const updateStatus = (element, type, message) => {
  element.className = `status-message ${type}`;
  element.textContent = message;
};

window.buttonClick = async (event) => {
  event.preventDefault();
  const container = document.getElementById('contenedor');
  const formData = new FormData(event.target);

  const nombre = formData.get('nombre');
  const edad = parseInt(formData.get('edad'));
  const gmail = formData.get('gmail');

  if (!nombre || !edad || !gmail) {
    window.alert(nombre)
    
    return updateStatus(container, 'error', 'Complete todos los datos');
  }

  try {
    const response = await fetch('http://localhost:4000/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Name: nombre, Age: edad, Gmail: gmail })
    });

    if (!response.ok) throw new Error('Error en el servidor');
    updateStatus(container, 'success', 'Datos Enviados con éxito :)');
  } catch (error) {
    updateStatus(container, 'error', 'Error al enviar los datos');
  }
};

export function About() {
  return `
    ${Header()}
    <style>${styles.container}</style>
    
    <div class="form-container">
      <form onsubmit="buttonClick(event)" id="Formularios">
        <div class="form-group">
          <label class="form-label" for="nombre">Nombre:</label>
          <input class="form-input" type="text" id="nombre" name="nombre" required>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="edad">Edad:</label>
          <input class="form-input" type="number" id="edad" name="edad" required>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="gmail">Gmail:</label>
          <input class="form-input" type="email" id="gmail" name="gmail" required>
        </div>
        
        <button type="submit" class="submit-btn">Registro</button>
        <div id="contenedor" class="status-message"></div>
      </form>
      
      <a href="http://localhost:4000/contact" class="view-data-link">
        Ver Datos
      </a>
    </div>
    
    ${Footer()}
  `;
}

const styles = {
  container: `
    .form-container {
      max-width: 500px;
      margin: 1rem auto;
      padding: 1.5rem;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.4rem;
      color: #2d3748;
      font-weight: 500;
      font-size: 0.875rem;
    }

    .form-input {
      width: 100%;
      padding: 0.6rem;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      font-size: 0.9rem;
      transition: border-color 0.2s;
    }

    .form-input:focus {
      outline: none;
      border-color: #4a90e2;
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
    }

    .submit-btn {
      width: 100%;
      padding: 0.75rem;
      background: #48bb78;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    .submit-btn:hover {
      background: #38a169;
    }

    .status-message {
      padding: 0.75rem;
      margin: 1rem 0;
      border-radius: 4px;
      text-align: center;
      font-size: 0.85rem;
    }

    .view-data-link {
      display: block;
      text-align: center;
      margin-top: 1.5rem;
      color: #4299e1;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
      font-size: 0.875rem;
    }
  `
};
