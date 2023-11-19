import asyncHandler from 'express-async-handler';
import { getTestimonial, createTestimonial, updateTestimonial, deleteTestimonial, getTestimonials, approveTestimonial } from '../../database/queries/testimonials/testimonialquery.js';

// Récupérer tous les témoignages
export const getAllTestimonials = asyncHandler(async (req, res) => {
    try {
        const testimonials = await getTestimonials();
        if (testimonials) {
            return res.status(200).json(testimonials);
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des témoignages", error: error.message });
    }
});

// Récupérer un témoignage par son ID
export const getOneTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const testimonial = await getTestimonial(id);
        if (!testimonial) {
            return res.status(404).json({ message: "Témoignage non trouvé" });
        }
        res.status(200).json(testimonial);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du témoignage", error: error.message });
    }
});

// Créer un nouveau témoignage
export const createOneTestimonial = asyncHandler(async (req, res) => {
    const { name, email, content, rating } = req.body;
    try {
        // valider les données
        if (!name, !email || !content || !rating) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }
        // Le rating doit être un nombre entre 1 et 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Le rating doit être un nombre entre 1 et 5" });
        }
        // Créer le témoignage dans la base de données
        const newTestimonial = await createTestimonial({ name, email, content, rating });
        res.status(201).json({ message: "Témoignage créé avec succès", testimonial: newTestimonial });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création du témoignage", error: error.message });
    }
});

// Mettre à jour un témoignage
export const updateOneTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, content, rating } = req.body;
    try {
        // Vérifiez d'abord si le témoignage existe
        const testimonialExists = await getTestimonial(id);

        if (!testimonialExists) {
            return res.status(404).json({ message: "Témoignage non trouvé" });
        }
        // valider les données
        if (!name, !email || !content || !rating) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }
        // Le rating doit être un nombre entre 1 et 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Le rating doit être un nombre entre 1 et 5" });
        }
        // Mettre à jour le témoignage dans la base de données
        const updatedTestimonial = await updateTestimonial(id,
            {
                name: name || testimonialExists.name,
                email: email || testimonialExists.email,
                content: content || testimonialExists.content,
                rating: rating || testimonialExists.rating
            });
        res.status(200).json({ message: "Témoignage mis à jour avec succès", testimonial: updatedTestimonial });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du témoignage", error: error.message });
    }
});

// Approuver un témoignage
export const approveOneTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        // Vérifiez d'abord si le témoignage existe
        const testimonialExists = await getTestimonial(id);
        if (!testimonialExists) {
            return res.status(404).json({ message: "Témoignage non trouvé" });
        }
        // Approuver le témoignage dans la base de données
        const approvedTestimonial = await approveTestimonial(id, { status: "approuvé" });
        res.status(200).json({ message: "Témoignage approuvé avec succès", testimonial: approvedTestimonial });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'approbation du témoignage", error: error.message });
    }
});

// Supprimer un témoignage
export const deleteOneTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        // Vérifiez d'abord si le témoignage existe
        const testimonialExists = await getTestimonial(id);
        if (!testimonialExists) {
            return res.status(404).json({ message: "Témoignage non trouvé" });
        }
        // Supprimer le témoignage de la base de données
        await deleteTestimonial(id);
        res.status(200).json({ message: "Témoignage supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du témoignage", error: error.message });
    }
});
