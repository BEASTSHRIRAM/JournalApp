const API_BASE = 'http://localhost:8080';

// Authentication Functions
function toggleAuthForm() {
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');
    loginSection.style.display = loginSection.style.display === 'none' ? 'block' : 'none';
    registerSection.style.display = registerSection.style.display === 'none' ? 'block' : 'none';
}

// Login Handler
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.innerHTML = '';

    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('jwt', data.token);
            window.location.href = 'journal.html';
        } else {
            throw new Error(data.message || 'Invalid credentials');
        }
    } catch (error) {
        statusMessage.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    }
});

// Registration Handler
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const statusMessage = document.getElementById('statusMessage');

    try {
        const response = await fetch(`${API_BASE}/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: document.getElementById('regUsername').value,
                password: document.getElementById('regPassword').value,
                email: document.getElementById('regEmail').value
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }

        statusMessage.innerHTML = '<div class="alert alert-success">Registration successful! Please login</div>';
        document.getElementById('registerForm').reset();
        toggleAuthForm();

    } catch (error) {
        statusMessage.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    }
});

// Journal Functions
async function loadEntries() {
    try {
        const response = await fetch(`${API_BASE}/journal`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        });

        if (!response.ok) throw new Error('Failed to load entries');

        const entries = await response.json();
        renderEntries(entries);
    } catch (error) {
        handleError(error);
    }
}

function renderEntries(entries) {
    const container = document.getElementById('entriesContainer');
    container.innerHTML = entries.map(entry => `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${entry.title || 'Untitled'}</h5>
                <p class="card-text">${entry.content || ''}</p>
                <div class="d-flex gap-2 justify-content-end">
                    <button class="btn btn-sm btn-warning"
                        onclick="editEntry('${entry.id}', '${entry.title}', '${entry.content}')">
                        <i class="bi bi-pencil"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger"
                        onclick="deleteEntry('${entry.id}')">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

async function deleteEntry(id) {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
        const response = await fetch(`${API_BASE}/journal/id/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        });

        if (!response.ok) throw new Error('Failed to delete entry');
        loadEntries();
    } catch (error) {
        handleError(error);
    }
}

function editEntry(id, title, content) {
    document.getElementById('entryId').value = id;
    document.getElementById('entryTitle').value = title;
    document.getElementById('entryContent').value = content;
    window.scrollTo(0, 0);
}

// Profile Functions
async function loadProfile() {
    try {
        const response = await fetch(`${API_BASE}/user`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        });

        if (!response.ok) throw new Error('Failed to load profile');

        const user = await response.json();
        document.getElementById('profileContent').innerHTML = `
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            ${user.createdAt ? `<p><strong>Joined:</strong> ${new Date(user.createdAt).toLocaleDateString()}</p>` : ''}
        `;
    } catch (error) {
        handleError(error);
    }
}

// Shared Functions
function logout() {
    localStorage.removeItem('jwt');
    window.location.href = 'index.html';
}

function handleError(error) {
    console.error('Error:', error);
    if (error.message.includes('401')) {
        logout();
    } else {
        alert(error.message);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('jwt')) {
        if (window.location.pathname.endsWith('index.html')) {
            window.location.href = 'journal.html';
        }

        if (window.location.pathname.endsWith('profile.html')) {
            loadProfile();
        }
    } else if (!window.location.pathname.endsWith('index.html')) {
        window.location.href = 'index.html';
    }
});