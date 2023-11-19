import { Router } from "express";
import { protect } from "../../middleware/authMiddleware.js";
import { 
    getAllTestimonials, 
    getOneTestimonial, 
    createOneTestimonial, 
    updateOneTestimonial, 
    deleteOneTestimonial, 
    approveOneTestimonial
} from "../../controllers/testimonials/testimonialsController.js";


const router = Router();


// GET all testimonials
router.get("/", getAllTestimonials);

// GET one testimonial
router.get("/:id", getOneTestimonial);

// POST a new testimonial
router.post("/", createOneTestimonial);

// Approve a testimonial
router.patch("/approve/:id", protect, approveOneTestimonial);

// PUT a testimonial
router.patch("/:id", updateOneTestimonial);

// DELETE a testimonial
router.delete("/:id", protect, deleteOneTestimonial);


export { router as testimonialRouter}