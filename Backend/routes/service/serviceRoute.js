import { Router } from "express";
import { 
    createOneService,
    getAllServices, 
    getOneService, 
    updateOneService, 
    deleteOneService 
} from '../../controllers/service/serviceController.js';
import { protect } from '../../middleware/authMiddleware.js';
import { upload } from "../../utils/fileUpload.js";

const router = Router();

// Get all services
router.get('/', getAllServices);

// Get one service
router.get('/:id', getOneService);

// Create a service
router.post('/', protect, upload.single('image'), createOneService);

// Update a service
router.patch('/:id', protect, upload.single('image'), updateOneService);

// Delete a service
router.delete('/:id', protect, deleteOneService);

export { router as serviceRouter};