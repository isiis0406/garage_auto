import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL_CLIENT = `${BACKEND_URL}/api/services`; // L'url de notre API

// Crée un nouveau service
const createService = async (formData) => {
    const res = await axios.post(`${API_URL_CLIENT}`, formData);
    return res.data;
}

// Récupérer tous les services
const getServices = async () => {
    const res = await axios.get(API_URL_CLIENT);
    return res.data;
}

// Supprimer un service
const deleteService = async (id) => {
    const res = await axios.delete(`${API_URL_CLIENT}/${id}`);
    return res.data;
}

// Récupérer un service
const getService = async (id) => {
    const res = await axios.get(`${API_URL_CLIENT}/${id}`);
    return res.data;
}

// modifier un service
const updateService = async (id, formData) => {
    const res = await axios.patch(`${API_URL_CLIENT}/${id}`, formData);
    return res.data;
}

const clientService = {
    createService,
    getServices,
    deleteService,
    getService,
    updateService
}
export default clientService;