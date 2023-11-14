import { pool } from '../../connexion.js'


// Get all services
export const getAllServices = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM service');
        return rows;
    } catch (error) {
        throw error;
    }
}

// Get one service
export const getService = async (id) => {
    try {
        const [rows] = await pool.query('SELECT * FROM service WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
}
// Create a service
export const createService = async (service) => {
    try {
        const [rows] = await pool.query(`
        INSERT INTO service (title, description, image_path)
        VALUES (?, ?, ?)
        `, [service.title, service.description, service.image_path]);
        ;
        const createdService = await getOneService(rows.insertId);
        return createdService;
    } catch (error) {
        throw error;
    }
}

// Update a service
export const updateService = async (id, service) => {
    try {
        const [rows] = await pool.query(`
        UPDATE service
        SET title = ?, description = ?, image_path = ?
        WHERE id = ?
        `, [service.title, service.description, service.image_path, id]);
        const updatedService = await getService(id);
        return updatedService;
    } catch (error) {
        throw error;
    }
}
