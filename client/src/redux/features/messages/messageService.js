import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL_CLIENT = `${BACKEND_URL}/api/messages`; // L'url de notre Endpoint

// Crée un message
const createMessage = async (formData) => {
    const res = await axios.post(`${API_URL_CLIENT}`, formData);
    return res.data;
}

// Récupérer tous messages
const getMessages = async () => {
    const res = await axios.get(API_URL_CLIENT);
    return res.data;
}

// Supprimer un message
const deleteMessage = async (id) => {
    const res = await axios.delete(`${API_URL_CLIENT}/${id}`);
    return res.data;
}

// Archiver un message
const archiveMessage = async (id) => {
    const res = await axios.patch(`${API_URL_CLIENT}/${id}/archive`);
    return res.data;
}

// Récupérer un message
const getMessage = async (id) => {
    const res = await axios.get(`${API_URL_CLIENT}/${id}`);
    return res.data;
}



const messageService = {
    createMessage,
    getMessages,
    deleteMessage,
    getMessage,
    archiveMessage
}
export default messageService;
