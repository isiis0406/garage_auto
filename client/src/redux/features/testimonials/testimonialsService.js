import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL_CLIENT = `${BACKEND_URL}/api/testimonials`; // L'url de notre Endpoint

// Crée un avis
const createTestimonial = async (formData) => {
    const res = await axios.post(`${API_URL_CLIENT}/create`, formData);
    return res.data;
}

// Récupérer tous les avis
const getTestimonials = async () => {
    const res = await axios.get(API_URL_CLIENT);
    return res.data;
}

// Supprimer un avis
const deleteTestimonial = async (id) => {
    const res = await axios.delete(`${API_URL_CLIENT}/${id}`);
    return res.data;
}

// Récupérer un avis
const getTestimonial = async (id) => {
    const res = await axios.get(`${API_URL_CLIENT}/${id}`);
    return res.data;
}

// modifier un avis
const updateTestimonial = async (id, formData) => {
    const res = await axios.patch(`${API_URL_CLIENT}/${id}`, formData);
    return res.data;
}

// Approuver un avis
const approveTestimonial = async (id, formData) => {
    const res = await axios.patch(`${API_URL_CLIENT}/approve/${id}`, formData);
    return res.data;
}

const testimonialService = {
    createTestimonial,
    getTestimonials,
    deleteTestimonial,
    getTestimonial,
    approveTestimonial,
    updateTestimonial
}
export default testimonialService;
