import { pool } from "../../connexion.js";


export const getAllUsers = async () => {
    const [rows] = await pool.query("SELECT id, name,email,role FROM users");
    return rows;

};
export const getUserById = async (id) => {
    const [rows] = await pool.query(`
    SELECT id, name,email,role
    FROM users 
    WHERE id=?`,
        [id]);
    return rows[0];

};
export const getUserByEmail = async (email) => {
    const [rows] = await pool.query(`
    SELECT * 
    FROM users 
    WHERE email=?`,
        [email]);
    return rows[0];

};
export const createUser = async (name, email, role) => {
    const [rows] = await pool.query(`
    INSERT INTO users (name,email,role) 
    VALUES (?,?,?)`,
        [name, email, role]);
    return rows;

}
export const updateUserById = async (id, name, email, role) => {
    const [rows] = await pool.query(`
    UPDATE users 
    SET name=?, email=?, role=? 
    WHERE id=?`,
        [name, email, role, id]);
    return rows;

}
export const deleteUserById = async (id) => {
    // Commencez par une transaction pour assurer l'intégrité des données
    await pool.query('START TRANSACTION');

    try {
        // Supprimer d'abord les tokens associés à l'utilisateur
        const deleteTokensResult = await pool.query(`
        DELETE FROM tokens 
        WHERE userId=?`,
            [id]
        );

        // Ensuite, supprimer l'utilisateur
        const deleteUserResult = await pool.query(`
        DELETE FROM users 
        WHERE id=?`,
            [id]
        );

        // Si tout se passe bien, commitez la transaction
        await pool.query('COMMIT');

        // Retournez le résultat de la suppression de l'utilisateur
        return deleteUserResult;
    } catch (error) {
        // S'il y a une erreur, annulez la transaction
        await pool.query('ROLLBACK');
        throw error; // Renvoyez l'erreur pour être gérée par le catch dans deleteUser
    }
}


