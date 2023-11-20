import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL_CLIENT = `${BACKEND_URL}/api/open-hours`; // L'url de notre Endpoint

// Crée des heures d'ouverture
const createOpeningHours = async (formData) => {
    const res = await axios.post(`${API_URL_CLIENT}`, formData);
    return res.data;
}

// Récupérer tous les horaires d'ouverture
const getOpeningHours = async () => {
    const res = await axios.get(API_URL_CLIENT);
    return res.data;
}


const openingHoursService = {
    createOpeningHours,
    getOpeningHours,
  
}
export default openingHoursService;
