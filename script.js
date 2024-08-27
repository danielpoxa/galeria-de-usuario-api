document.getElementById('fetchButton').addEventListener('click', fetchUserInformation);
document.getElementById('searchIdButton').addEventListener('click', searchUserById);
document.getElementById('searchNameButton').addEventListener('click', searchUserByName);
document.getElementById('addUserButton').addEventListener('click', addUser);

function fetchUserInformation() {
    fetch('http://localhost:3000/api/users')
        .then(response => response.json())
        .then(data => {
            displayUsers(data);
        })
        .catch(error => console.error('Erro ao buscar informações dos usuários:', error));
}

function searchUserById() {
    const searchValue = document.getElementById('searchIdInput').value.trim();

    fetch('http://localhost:3000/api/users')
        .then(response => response.json())
        .then(data => {
            const filteredUsers = data.filter(user => 
                user.idusers.toString() === searchValue
            );
            displayUsers(filteredUsers);
        })
        .catch(error => console.error('Erro ao buscar informações dos usuários:', error));
}

function searchUserByName() {
    const searchValue = document.getElementById('searchNameInput').value.toLowerCase().trim();

    fetch('http://localhost:3000/api/users')
        .then(response => response.json())
        .then(data => {
            const filteredUsers = data.filter(user => 
                user.name.toLowerCase().includes(searchValue)
            );
            displayUsers(filteredUsers);
        })
        .catch(error => console.error('Erro ao buscar informações dos usuários:', error));
}

function displayUsers(users) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Limpa os usuários anteriores
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card';

        const name = document.createElement('h2');
        name.textContent = `Nome: ${user.name ? user.name : 'N/A'}`;
        card.appendChild(name);

        const email = document.createElement('p');
        email.textContent = `Email: ${user.email ? user.email : 'N/A'}`;
        card.appendChild(email);

        const id = document.createElement('p');
        id.textContent = `ID: ${user.idusers}`;
        card.appendChild(id);

        // Botão de edição
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'edit-button';
        editButton.addEventListener('click', () => editUser(user.idusers));
        card.appendChild(editButton);

        // Botão de exclusão
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => deleteUser(user.idusers));
        card.appendChild(deleteButton);

        gallery.appendChild(card);
    });
}

function editUser(id) {
    const newName = prompt('Digite o novo nome:');
    const newEmail = prompt('Digite o novo email:');

    if (newName && newEmail) {
        fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName, email: newEmail })
        })
        .then(response => response.json())
        .then(() => {
            fetchUserInformation(); // Atualiza a lista de usuários
        })
        .catch(error => console.error('Erro ao editar o usuário:', error));
    }
}

function deleteUser(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            fetchUserInformation(); // Atualiza a lista de usuários
        })
        .catch(error => console.error('Erro ao excluir o usuário:', error));
    }
}

function addUser() {
    const name = document.getElementById('newUserName').value.trim();
    const email = document.getElementById('newUserEmail').value.trim();

    if (name && email) {
        fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email })
        })
        .then(response => response.json())
        .then(() => {
            fetchUserInformation(); // Atualiza a lista de usuários
        })
        .catch(error => console.error('Erro ao adicionar o usuário:', error));
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}
