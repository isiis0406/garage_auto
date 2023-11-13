import { pool } from "../../connexion.js";


export const changePasswordById = async (id, password) => {
    const [rows] = await pool.query(`
    UPDATE users 
    SET password=? 
    WHERE id=?`,
        [password, id]);
    return rows;

}
export const getAuthUserById = async (id) => {
    const [rows] = await pool.query(`
    SELECT id, name,email,role, password
    FROM users 
    WHERE id=?`,
        [id]);
    return rows[0];

};