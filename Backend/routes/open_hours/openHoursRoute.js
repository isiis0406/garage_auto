import { Router } from "express";

import { 
    getAllOpensHours, 
    getOneOpenHours, 
    createMultipleOpenHours, 
    updateMultipleOpenHours, 
    deleteMultipleOpenHours 
} from "../../controllers/open_hours/openHoursController.js";

const router = Router();

// Get all open hours
router.get('/', getAllOpensHours);

// Get one open hours
router.get('/:id', getOneOpenHours);

// Create a open hours
router.post('/', createMultipleOpenHours);

// Update a open hours
router.patch('/:id', updateMultipleOpenHours);

// Delete a open hours
router.delete('/:id', deleteMultipleOpenHours);


export { router as openHoursRouter}