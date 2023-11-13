import { getAllCars } from '../../database/queries/car/carquery.js';

// Get all cars
export const getCars = async (req, res) => {
    try {
        const cars = await getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}