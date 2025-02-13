import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';


const styles = `
  .contact-container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 1rem;
  }
  .page-title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  th, td {
    padding: 0.75rem;
    border: 1px solid #dee2e6;
    text-align: left;
  }
  th {
    background-color: #2b8a3e;
    color: #fff;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  .action-buttons button {
    margin-right: 0.5rem;
  }
  .botones {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    position: relative;
  }
  .modal-title {
    margin-top: 0;
    margin-bottom: 1.5rem;
  }
  .form-group {
    margin-bottom: 1rem;
  }
  .form-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

// Estilos para la vista de About (formulario)
const aboutStyles = {
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

const UserActions = {
  fetchUsers: async () => {
    try {
      const response = await fetch('http://localhost:4000/api/data');
      // Se asume que la API devuelve { data: [...] }
      const result = response.ok ? await response.json() : { data: [] };
      return result.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  getUserById: async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/data/${id}`);
      if (response.ok) {
        const result = await response.json();
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },

  saveChanges: async (id) => {
    try {
      const nameInput = document.getElementById('edit-name');
      const ageInput = document.getElementById('edit-age');
      const gmailInput = document.getElementById('edit-gmail');

      if (!nameInput || !ageInput || !gmailInput) {
        console.error('No se encontraron los campos de edición');
        return;
      }

      const name = nameInput.value;
      const age = parseInt(ageInput.value, 10);
      const gmail = gmailInput.value;

      const response = await fetch(`http://localhost:4000/api/data/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { name, age, gmail } )
      });

      if (response.ok) {
        alert('Datos actualizados');
        UserActions.closeModal();
        loadUsers();
      } else {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = await response.text();
        }
        alert('Error al actualizar datos: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      alert('Error al actualizar datos: ' + error.message);
    }
  },

  showEditModal: async (id) => {
    const user = await UserActions.getUserById(id);


    if (!user) return;

    const modalHTML = `
      <div class="modal-overlay" id="modal">
        <div class="modal-content">
          <button class="botones" style="position: absolute; top: 10px; right: 10px;" onclick="UserActions.closeModal()">X</button>
          <h2 class="modal-title">Editar datos</h2>
          <div class="form-group">
            <label>Nombre:</label>
            <input class="form-input" id="edit-name" value="${user.name}" />
          </div>
          <div class="form-group">
            <label>Edad:</label>
            <input class="form-input" id="edit-age" type="number" value="${user.age}" />
          </div>
          <div class="form-group">
            <label>Gmail:</label>
            <input class="form-input" id="edit-gmail" value="${user.gmail}" />
          </div>
          <div class="action-buttons" style="margin-top: 1.5rem;">
            <button class="botones" onclick="UserActions.saveChanges(${id})">Guardar cambios</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  },

  closeModal: () => {
    const modal = document.getElementById('modal');
    if (modal) modal.remove();
  },

  deleteUser: async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;
    try {
      const response = await fetch(`http://localhost:4000/api/data/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Usuario eliminado correctamente');
        loadUsers();
      } else {
        alert('Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  },

};

function loadUsers() {
  UserActions.fetchUsers().then(users => {
    const usersTableBody = document.getElementById('users-table-body');
    if (!usersTableBody) return;

    usersTableBody.innerHTML = ''; // Limpiar tabla antes de cargar

    users.forEach(user => {
      const rowHTML = `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.age}</td>
          <td>${user.gmail}</td>
          <td class="action-buttons">
            <button class="botones" onclick="UserActions.showEditModal(${user.id})">✏️ Editar</button>
            <button class="botones" onclick="UserActions.deleteUser(${user.id})" style="background: #e03131;">🗑️ Eliminar</button>
          </td>
        </tr>
      `;
      usersTableBody.insertAdjacentHTML('beforeend', rowHTML);
    });
  });
}

export function Contact() {
  // Ejecutar initContact después de renderizar
  setTimeout(initContact, 0);

  return `
    ${Header()}
    <style>${styles}</style>
    <div class="contact-container">
      <h1 class="page-title">Datos Registrados</h1>
      <a href="http://localhost:4000/about" class="botones">Nuevo Registro</a>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Gmail</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="users-table-body"></tbody>
      </table>
    </div>
    ${Footer()}
  `;
}

export function initContact() {
  loadUsers();
}

window.UserActions = UserActions;
