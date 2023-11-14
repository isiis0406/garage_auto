import { Router } from "express";

import {
    getAllMessages,
    getOneMessage,
    postMessage,
    archiveOneMessage,
    deleteOneMessage
} from '../../controllers/message/messageController.js';
import { protect } from "../../middleware/authMiddleware.js";

const router = Router();


// Récupérer tous les messages
router.get('/', protect, protect, getAllMessages);

// Récupérer un message
router.get('/:id', protect, getOneMessage);

// Créer un message
router.post('/', postMessage);

// Archiver un message
router.patch('/:id/archive', protect, archiveOneMessage);

// Supprimer un message
router.delete('/:id', protect, deleteOneMessage);


export { router as messageRouter}
