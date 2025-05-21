// 🌐 URL de base par défaut de l'API
const API_BASE_URL = "http://localhost:4000/api/v1";

/**
 * 👤 Récupère les informations de l'utilisateur connecté
 *
 * @param {string} [api_base_url=API_BASE_URL] - URL de base de l'API
 * @returns {Promise<Object>} Données du profil utilisateur
 * @throws {Error} Si l'utilisateur n'est pas authentifié
 */
export async function getProfile(api_base_url = API_BASE_URL) {
    try {
        const res = await fetch(api_base_url+'/users/profile', {
            method: 'GET',
            credentials: 'include' // envoie le cookie 'token' automatiquement
        });

        return res.ok;
        // session invalide
    } catch (err) {
        console.error('Erreur lors de la vérification de session :', err);
        return false;
    }
}

/**
 * 🔐 Connecte un utilisateur avec email et mot de passe
 *
 * @param {string} email - Email utilisateur
 * @param {string} password - Mot de passe utilisateur
 * @param {string} [api_base_url=API_BASE_URL] - URL de base de l'API
 * @returns {Promise<Object>} Réponse JSON de l'API
 * @throws {Error} En cas d'échec d'authentification
 */
export async function login(email, password, api_base_url = API_BASE_URL) {
    try {
        const res = await fetch(api_base_url+'/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include' // pour recevoir le cookie token
        });

        const data = await res.json();
        if (res.ok) {
            return { success: true, data };
        } else {
            return { success: false, message: data.message || 'Échec de la connexion' };
        }
    } catch (err) {
        console.error("Erreur lors de la connexion :", err);
        return { success: false, message: 'Erreur réseau, merci de réessayer.' };
    }
}

/**
 * 🚪 Déconnecte l'utilisateur actuel
 *
 * @param {string} [api_base_url=API_BASE_URL] - URL de base de l'API
 * @returns {Promise<void>}
 */
export async function logout(api_base_url = API_BASE_URL) {
    await fetch(`${api_base_url}/users/logout`, {
        method: 'POST',
        credentials: 'include'
    });
}
