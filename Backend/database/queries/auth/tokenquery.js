import {pool} from "../../connexion.js";


//Get token
export const getToken = async (userId) => {
    const [rows] = await pool.query(`
    SELECT id, token, userId, expiresAt 
    FROM tokens 
    WHERE userId=?`, 
    [userId]);
    return rows[0];
    
};
//Get token by token
export const getTokenByToken = async (token) => {
    const [rows] = await pool.query(`
    SELECT id, token, userId, expiresAt 
    FROM tokens 
    WHERE token=?`, 
    [token]);
    return rows[0];
    
};

//Create token
export const createToken = async (userId, token,created_at, expiresAt) => {
    const [rows] = await pool.query(`
    INSERT INTO tokens (userId, token, created_at, expiresAt) 
    VALUES (?,?,?,?)`, 
    [userId, token, created_at, expiresAt]);
    return rows[0];
}

//Delete token
export const deleteToken = async (id) => {
    const [rows] = await pool.query(`
    DELETE FROM tokens 
    WHERE id=?`, 
    [id]);
    return rows;
    
};
