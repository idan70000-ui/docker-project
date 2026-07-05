const API_URL = "/api/users";

const totalUsers = document.getElementById('totalUsers');
const aveAge = document.getElementById('aveAge');
const usersGrid = document.getElementById('usersGrid');



async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}`);
        const users = await response.json();
        console.log(users);
        renderUsers(users);

    } catch (error) {
        console.error('Error loading users:', error);
    }
}

function renderUsers(users) {
        console.log(users.length);
        if (users.length === 0) {
            usersGrid.innerHTML = '<p>No users found.</p>';
            return;
        } 
        


usersGrid.innerHTML = users.map((user) => `
    <div class="card">
        <button class="delete-btn" onclick="deleteUser('${user._id}')">Delete 🗑️</button>
        <div>${user.name}</div>
        <div>${user.email}</div>
        <div>${user.age}</div>
        <div>${user.hobbies}</div>
        <div>${user.pets}</div>
    </div>
`).join('');
}

async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
        loadUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

loadUsers();
