import { Router } from "express";
import { protect } from "../../middleware/authMiddleware.js";
import { 
    getAllTestimonials, 
    getOneTestimonial, 
    createOneTestimonial, 
    updateOneTestimonial, 
    deleteOneTestimonial 
} from "../../controllers/testimonials/testimonialsController.js";


const router = Router();


// GET all testimonials
router.get("/", getAllTestimonials);

// GET one testimonial
router.get("/:id", getOneTestimonial);

// POST a new testimonial
router.post("/", createOneTestimonial);

// PUT a testimonial
router.patch("/:id", updateOneTestimonial);

// DELETE a testimonial
router.delete("/:id", protect, deleteOneTestimonial);


export { router as testimonialRouter}