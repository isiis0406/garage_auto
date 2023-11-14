import { pool} from '../../connexion.js';


// Get all open hours
export const getAllOpenHours = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM opening_hours');
        return rows;
    } catch (error) {
        console.error(error);
    }
}

// Get one open hours
export const getOpenHours = async (id) => {
    try {
        const [rows] = await pool.query('SELECT * FROM opening_hours WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error(error);
    }
}
// Create a open hours
export const createOpenHours = async (openHours) => {
    try {
        const [rows] = await pool.query(`
        INSERT INTO opening_hours (day, open_time, close_time)
        VALUES (?, ?, ?)
        `, [openHours.day, openHours.open_time, openHours.close_time]);
        ;
        const createdOpenHours = await getOpenHours(rows.insertId);
        return createdOpenHours;
    } catch (error) {
        console.error(error);
    }
}

// Update a open hours
export const updateOpenHours = async (id, openHours) => {
    try {
        const [rows] = await pool.query(`
        UPDATE opening_hours
        SET day = ?, open_time = ?, close_time = ?
        WHERE id = ?
        `, [openHours.day, openHours.open_time, openHours.close_time, id]);
        const updatedOpenHours = await getOpenHours(id);
        return updatedOpenHours;
    } catch (error) {
        console.error(error);
    }
}

// Delete a open hours
export const deleteOpenHours = async (id) => {
    try {
        const [rows] = await pool.query('DELETE FROM opening_hours WHERE id = ?', [id]);
        return rows;
    } catch (error) {
        console.error(error);
    }
}