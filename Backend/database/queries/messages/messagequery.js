import { pool } from "../../connexion.js";


// Get all messages
export const getMessages = async () => {
    try {
        const [rows] = await pool.query(`SELECT * FROM messages`)
        return rows
    } catch (error) {
        console.log(error)
    }
}

// Get one message
export const getMessage = async (id) => {
    try {
        const [row] = await pool.query(`SELECT * FROM messages WHERE id = ?`, [id])
        if(row.length === 0) {
            return null;
        }
        return row[0];
    } catch (error) {
        console.log(error)
    }
}

// Create a message
export const createMessage = async (message) => {
    try {
        const [rows] = await pool.query(`INSERT INTO messages (name, phone, email, message) 
        VALUES (?, ?, ?, ?)`,
            [message.name, message.phone, message.email, message.message])
        const newMessage = await getMessage(rows.insertId);
        return newMessage;
    } catch (error) {
        console.log(error);
    }
}

// Archive a message
export const archiveMessage = async (id) => {
    try {
        const [rows] = await pool.query(`UPDATE messages SET archived = 1 WHERE id = ?`, [id])
        const archivedMessage = await getMessage(id);
        return archivedMessage;
    } catch (error) {
        console.log(error);
    }
}

// Delete a message
export const deleteMessage = async (id) => {
    try {
        const result = await pool.query(`DELETE FROM messages WHERE id = ?`, [id])
        return result;
    } catch (error) {
        console.log(error);
    }
}