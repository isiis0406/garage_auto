import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL_CLIENT = `${BACKEND_URL}/api/users`; // L'url de notre Endpoint

// Crée un utilisateur
const createUser = async (formData) => {
    const res = await axios.post(`${API_URL_CLIENT}/create`, formData);
    return res.data;
}

// Récupérer tous les utilisateurs
const getUsers = async () => {
    const res = await axios.get(API_URL_CLIENT);
    return res.data;
}

// Supprimer un utilisateur
const deleteUser = async (id) => {
    const res = await axios.delete(`${API_URL_CLIENT}/${id}`);
    return res.data;
}

// Récupérer un utilisateur
const getUser = async (id) => {
    const res = await axios.get(`${API_URL_CLIENT}/${id}`);
    return res.data;
}

// modifier un utilisateur
const updateUser = async (id, formData) => {
    const res = await axios.patch(`${API_URL_CLIENT}/${id}`, formData);
    return res.data;
}

const userService = {
    createUser,
    getUsers,
    deleteUser,
    getUser,
    updateUser
}
export default userService;
