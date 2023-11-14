import { pool } from '../../connexion.js'


// Get all services
export const getServices = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM services');
        return rows;
    } catch (error) {
        throw error;
    }
}

// Get one service
export const getService = async (id) => {
    try {
        const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
}
// Create a service
export const createService = async (service) => {
    try {
        const [rows] = await pool.query(`
        INSERT INTO services (title, description, image_path)
        VALUES (?, ?, ?)
        `, [service.title, service.description, service.image_path]);
        ;
        const createdService = await getService(rows.insertId);
        return createdService;
    } catch (error) {
        throw error;
    }
}

// Update a service
export const updateService = async (id, service) => {
    try {
        const [rows] = await pool.query(`
        UPDATE services
        SET title = ?, description = ?, image_path = ?
        WHERE id = ?
        `, [service.title, service.description, service.image_path, id]);
        const updatedService = await getService(id);
        return updatedService;
    } catch (error) {
        throw error;
    }
}

// Delete a service
export const deleteService = async (id) => {
    try {
        const [rows] = await pool.query('DELETE FROM services WHERE id = ?', [id]);
        return rows;
    } catch (error) {
        throw error;
    }
}
