import { Router } from "express";

const router = Router();


// Get all cars
router.get("/", (req, res) => {
    //
});

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