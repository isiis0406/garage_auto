import { pool } from "../../connexion.js";


// Get One Car
export const getCarById = async (id) => {
    const [rows] = await pool.query(`
    SELECT id, brand, model, release_year, price,description, image_path, kilometers
    FROM cars 
    WHERE id=?`,
        [id]);
    return rows[0];
}

// Get All Cars
export const getAllCars = async () => {
    const [rows] = await pool.query(`
    SELECT id, brand, model, release_year, price,description, image_path, kilometers
    FROM cars`);
    return rows;
}

// Create a Car
export const createCar = async (car) => {
    // Créer la voiture
    const [rows] = await pool.query(`
    INSERT INTO cars (brand, model, release_year, price, description, image_path, kilometers)
    VALUES (?,?,?,?,?,?,?)`,
        [car.brand, car.model, car.release_year, car.price, car.description, car.image_path, car.kilometers]);

    const id = rows.insertId;
    // Récupérer la voiture créée
    const carCreated = await getCarById(id);
    return carCreated;
}
// Update a Car
export const updateCar = async (id, car) => {
    const [rows] = await pool.query(`
    UPDATE cars 
    SET brand=?, model=?, release_year=?, price=?, description=?, image_path=?, kilometers=?
    WHERE id=?`,
        [car.brand, car.model, car.release_year, car.price, car.description, car.image_path, car.kilometers, id]);
    const updatedCar = await getCarById(id);
    return updatedCar;
}
// Delete a Car
export const deleteCar = async (id) => {
    const [rows] = await pool.query(`
    DELETE FROM cars 
    WHERE id=?`,
        [id]);
    return rows;
}