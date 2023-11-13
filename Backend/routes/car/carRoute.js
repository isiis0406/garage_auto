import { Router } from "express";
import { protect} from "../../middleware/authMiddleware.js";
import { upload } from "../../utils/fileUpload.js";
import { 
    createOneCar,
    getCars,
    getOneCar,
    updateOneCar,
    deleteOneCar
} from "../../controllers/car/carController.js";
const router = Router();


// Get all cars
router.get("/", getCars );

// Get a car
router.get("/:id", getOneCar);

// Create a car
router.post("/create", protect, upload.single("image"), createOneCar);

// Update a car
router.patch("/:id", protect, upload.single("image"), updateOneCar);
// Delete a car
router.delete("/:id", protect, deleteOneCar);

export { router as carRouter };