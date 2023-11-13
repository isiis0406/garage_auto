import { Router } from "express";
import { protect} from "../../middleware/authMiddleware.js";
import { 
    getCars
} from "../../controllers/car/carController.js";
const router = Router();


// Get all cars
router.get("/", protect, getCars );

// Get a car
router.get("/:id", (req, res) => {
    //
});

// Create a car
router.post("/", (req, res) => {
    //
});

// Update a car
router.patch("/:id", (req, res) => {
    //
});
// Delete a car
router.delete("/:id", (req, res) => {
    //
});

export { router as carRouter };