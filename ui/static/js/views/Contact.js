import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';

const UserActions = {
  fetchUsers: async () => {
    try {
      const response = await fetch('http://localhost:4000/api/datos');
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  getUserById: async (id) => {
    const response = await fetch(`http://localhost:4000/api/datos/${id}`);
    return await response.json();
  },

  showEditModal: async (id) => {
    const user = await UserActions.getUserById(id);
    const modalHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <h2 class="modal-title">Editar datos</h2>
          <div class="form-group">
            <label>Nombre:</label>
            <input class="form-input" id="edit-name" value="${user.Name}">
          </div>
          <div class="form-group">
            <label>Edad:</label>
            <input class="form-input" id="edit-age" value="${user.Age}">
          </div>
          <div class="form-group">
            <label>Gmail:</label>
            <input class="form-input" id="edit-gmail" value="${user.Gmail}">
          </div>
          <div class="action-buttons" style="margin-top: 1.5rem;">
            <button class="botones" onclick="UserActions.saveChanges(${id})">
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  },

  saveChanges: async (id) => {
    const updatedUser = {
      Name: document.getElementById('edit-name').value,
      Age: parseInt(document.getElementById('edit-age').value),
      Gmail: document.getElementById('edit-gmail').value
    };

    await fetch(`http://localhost:4000/api/datos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser)
    });

    window.location.reload();
  },

  deleteUser: async (id) => {
    if (confirm('¿Estás seguro de eliminar este usuario permanentemente?')) {
      await fetch(`http://localhost:4000/api/datos/${id}`, { 
        method: 'DELETE' 
      });
      window.location.reload();
    }
  }
};

export function Contact() {
  return `
    ${Header()}
    <style>${styles}</style>
    
    <div class="contact-container">
      <h1 class="page-title">Datos Registrados</h1>
      <a href="http://localhost:4000/" class="botones">Nuevo Registro</a>
      
      <div id="users-list" class="user-list"></div>
    </div>

    ${Footer()}

    <script>
      (async () => {
        const users = await UserActions.fetchUsers();
        const usersList = document.getElementById('users-list');
        
        users.forEach(user => {
          const userHTML = \`
            <div class="user-card">
              <div class="avatar">
              </div>
              
              <div class="user-info">
                <ul class="user-info-list">
                  <li class="user-info-item">
                    <span class="info-label">Nombre:</span>
                    <span>\${user.Name}</span>
                  </li>
                  <li class="user-info-item">
                    <span class="info-label">Edad:</span>
                    <span>\${user.Age}</span>
                  </li>
                  <li class="user-info-item">
                    <span class="info-label">Gmail:</span>
                    <span>\${user.Gmail}</span>
                  </li>
                </ul>
              </div>
              
              <div class="action-buttons">
                <button class="botones" 
                  onclick="UserActions.showEditModal('\${user.Id}')">
                  ✏️ Editar
                </button>
                <button class="botones" 
                  onclick="UserActions.deleteUser('\${user.Id}')"
                  style="background: #e03131;">
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          \`;
          
          usersList.insertAdjacentHTML('beforeend', userHTML);
        });
      })();
    </script>
  `;
}

const styles = `
  .contact-container { 
    max-width: 1200px; 
    margin: 2rem auto; 
    padding: 0 1rem; 
  }

  .page-title { 
    color: #2b8a3e; 
    font-size: 2.5rem; 
    text-align: center; 
    margin-bottom: 2rem; 
  }

  .user-list { 
    display: grid; 
    gap: 1.5rem; 
  }

  .user-card {
    display: flex; 
    align-items: center; 
    padding: 1.5rem;
    background: white; 
    border-radius: 8px; 
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border: 1px solid #d3f9d8;
  }

  .avatar {
    width: 100px; 
    height: 100px; 
    border-radius: 50%; 
    margin-right: 2rem;
    background-color: #e9ecef; 
    overflow: hidden;
  }

  .user-info { 
    flex-grow: 1; 
  }

  .user-info-list { 
    list-style: none; 
    padding: 0; 
    margin: 0; 
  }

  .user-info-item { 
    display: flex; 
    gap: 0.5rem; 
    margin-bottom: 0.5rem; 
    font-size: 1.1rem; 
  }

  .info-label { 
    font-weight: 500; 
    color: #2b8a3e; 
    min-width: 70px; 
  }

  .action-buttons { 
    display: flex; 
    gap: 1rem; 
    margin-left: auto;
    flex-direction: column; 
  }

  .botones {
    background: #2b8a3e;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: opacity 0.3s;
    text-align: center;
    text-decoration: none;
  }

  .botones:hover {
    opacity: 0.9;
  }

  .modal-overlay {
    position: fixed; 
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0;
    background: rgba(0,0,0,0.4); 
    display: flex; 
    justify-content: center;
    align-items: center; 
    z-index: 1000; 
  }

  .modal-content { 
    background: white; 
    padding: 2rem; 
    border-radius: 8px; 
    width: 90%; 
    max-width: 500px; 
  }

  .modal-title { 
    margin-top: 0; 
    color: #2b8a3e; 
    margin-bottom: 1.5rem;
  }

  .form-group { 
    margin-bottom: 1.5rem; 
  }

  .form-input {
    width: 100%; 
    padding: 0.75rem; 
    border: 1px solid #dee2e6;
    border-radius: 4px; 
    font-size: 1rem;
    margin-top: 0.5rem;
  }

  .form-input:focus { 
    outline: 2px solid #4dabf7; 
    border-color: transparent;
  }
`;

window.UserActions = UserActions;