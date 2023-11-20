import asyncHandler from "express-async-handler";
import { getAllOpenHours, getOpenHours, createOpenHours, updateOpenHours, deleteOpenHours, deleteAllOpenHours } from "../../database/queries/open_hours/openHoursquery.js";



// Get all open hours
export const getAllOpensHours = async (req, res) => {
    try {
        const openHours = await getAllOpenHours();
        if (!openHours) {
            return res.status(404).json({ message: "Horaires d'ouverture non trouvés" });
        }
        return res.status(200).json(openHours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get one open hours
export const getOneOpenHours = async (req, res) => {
    const id = req.params.id;
    try {
        const openHours = await getOpenHours(id);
        if (!openHours) {
            return res.status(404).json({ message: "Horaire d'ouverture non trouvé" });
        }
        return res.status(200).json(openHours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create multiple open hours
export const createMultipleOpenHours = asyncHandler(async (req, res) => {
    const openHoursList = req.body;
    // Supprimer les horaires d'ouverture existants
    try {
        await deleteAllOpenHours();
    } catch (error) {
        // Renvoyer une erreur en cas de problème avec la suppression des entrées existantes
        return res.status(500).json({
            message: "Une erreur est survenue lors de la suppression des horaires d'ouverture existants.",
            error: error.message
        });
    }
    if(!openHoursList.length) {
        return res.status(400).json({
            message: "Échec de la création des horaires d'ouverture. La liste des horaires d'ouverture est vide."
        });
    };
    for (let openHoursData of openHoursList) {
        // Valider les données
        if (!openHoursData.day || !openHoursData.morning_hours || !openHoursData.afternoon_hours) {
            // Renvoyer immédiatement une erreur avec des détails spécifiques
            return res.status(400).json({
                message: `Échec de la création de l'horaire d'ouverture pour ${openHoursData.day || 'jour inconnu'}. Les champs jour, heure d'ouverture et de fermeture sont requis.`,
                failedEntry: openHoursData
            });
        }

        // Si les données sont valides, tentez de créer l'horaire d'ouverture
        try {
            await createOpenHours(openHoursData);
        } catch (error) {
            // Renvoyer une erreur en cas de problème avec la création d'une entrée
            return res.status(500).json({
                message: `Une erreur est survenue lors de la création de l'horaire d'ouverture pour ${openHoursData.day}.`,
                error: error.message
            });
        }
    }

    // Si toutes les entrées sont valides et créées sans erreur
    return res.status(201).json({
        message: "Tous les horaires d'ouverture ont été créés avec succès."
    });
});



// Update multiple open hours
export const updateMultipleOpenHours = async (req, res) => {
    const openHoursList = req.body;

    for (let openHoursData of openHoursList) {
        // Valider les données
        if (!openHoursData.day || !openHoursData.morning_hours || !openHoursData.afternoon_hours) {
            // Renvoyer immédiatement une erreur avec des détails spécifiques
            return res.status(400).json({
                message: `Échec de la mise à jour de l'horaire d'ouverture pour ${openHoursData.day || 'jour inconnu'}. Les champs jour, heure d'ouverture et de fermeture sont requis.`,
                failedEntry: openHoursData
            });
        }

        // Si les données sont valides, tentez de mettre à jour l'horaire d'ouverture
        try {
            await updateOpenHours(openHoursData.id, openHoursData);
        } catch (error) {
            // Renvoyer une erreur en cas de problème avec la mise à jour d'une entrée
            return res.status(500).json({
                message: `Une erreur est survenue lors de la mise à jour de l'horaire d'ouverture pour ${openHoursData.day}.`,
                error: error.message
            });
        }
    }

    // Si toutes les entrées sont valides et mises à jour sans erreur
    return res.status(200).json({
        message: "Tous les horaires d'ouverture ont été mis à jour avec succès."
    });
}

// Delete multiple open hours
export const deleteMultipleOpenHours = async (req, res) => {
    const openHoursList = req.body;

    for (let openHoursData of openHoursList) {
        // Valider les données
        if (!openHoursData.id) {
            // Renvoyer immédiatement une erreur avec des détails spécifiques
            return res.status(400).json({
                message: `Échec de la suppression de l'horaire d'ouverture pour ${openHoursData.day || 'jour inconnu'}. Le champ id est requis.`,
                failedEntry: openHoursData
            });
        }

        // Si les données sont valides, tentez de supprimer l'horaire d'ouverture
        try {
            await deleteOpenHours(openHoursData.id);
        } catch (error) {
            // Renvoyer une erreur en cas de problème avec la suppression d'une entrée
            return res.status(500).json({
                message: `Une erreur est survenue lors de la suppression de l'horaire d'ouverture pour ${openHoursData.day}.`,
                error: error.message
            });
        }
    }

    // Si toutes les entrées sont valides et supprimées sans erreur
    return res.status(200).json({
        message: "Tous les horaires d'ouverture ont été supprimés avec succès."
    });
}