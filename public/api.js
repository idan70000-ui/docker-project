const API_URL = "/api/users";

const totalUsersEl = document.getElementById('totalUsers');
const avgAgeEl = document.getElementById('avgAge');
const usersGrid = document.getElementById('usersGrid');
const addUserForm = document.getElementById('addUserForm');

async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}`);
        const users = await response.json();
        renderUsers(users);
        updateStats(users);
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

function updateStats(users) {
    totalUsersEl.textContent = users.length;
    if (users.length === 0) {
        avgAgeEl.textContent = 0;
    } else {
        const avg = users.reduce((sum, u) => sum + Number(u.age), 0) / users.length;
        avgAgeEl.textContent = avg.toFixed(1);
    }
}

function renderUsers(users) {
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

addUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const hobbies = document.getElementById('hobbies').value;
    const pets = document.getElementById('pets').value;

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, age, hobbies, pets })
        });
        addUserForm.reset();
        loadUsers();
    } catch (error) {
        console.error('Error adding user:', error);
    }
});

async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        loadUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

loadUsers();