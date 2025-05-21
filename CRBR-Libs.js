const API_BASE_URL = "http://localhost:4000/api/v1";

export async function getProfile() {
    const res = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'GET',
        credentials: 'include'
    });
    if (!res.ok) throw new Error('Non authentifié');
    return res.json();
}

export async function login(email, password) {
    const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Erreur de login');
    return res.json();
}

export async function logout() {
    await fetch(`${API_BASE_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include'
    });
}
