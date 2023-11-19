import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL_CLIENT = `${BACKEND_URL}/api/cars`; // L'url de notre Endpoint

// Crée une nouvelle voiture
const createCar = async (formData) => {
    const res = await axios.post(`${API_URL_CLIENT}/create`, formData);
    return res.data;
}

// Récupérer toutes les voitures
const getCars = async () => {
    const res = await axios.get(API_URL_CLIENT);
    return res.data;
}

// Supprimer une voiture
const deleteCar = async (id) => {
    const res = await axios.delete(`${API_URL_CLIENT}/${id}`);
    return res.data;
}

// Récupérer une voiture
const getCar = async (id) => {
    const res = await axios.get(`${API_URL_CLIENT}/${id}`);
    return res.data;
}

// modifier une voiture
const updateCar = async (id, formData) => {
    const res = await axios.patch(`${API_URL_CLIENT}/${id}`, formData);
    return res.data;
}

const carService = {
    createCar,
    getCars,
    deleteCar,
    getCar,
    updateCar
}
export default carService;
