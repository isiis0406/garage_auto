import asyncHandler from "express-async-handler";
import { createService, deleteService, getService, getServices, updateService } from "../../database/queries/service/servicequery.js";
import { fileSizeFormatter, upload } from "../../utils/fileUpload.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Get all services
export const getAllServices = asyncHandler(async (req, res) => {
    try {
        const services = await getServices();
        if (!services) {
            return res.status(404).json({ message: "Aucun service trouvé" });
        }
        return res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get one service
export const getOneService = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const service = await getService(id);
        if (!service) {
            return res.status(404).json({ message: "Service non trouvé" });
        }
        return res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a service
export const createOneService = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    console.log(req.body);
    // Valider les données
    if (!title || !description) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }

    // Traiter l'image
    let fileData = {};
    let uploadedFile;

    // Traiter l'image si une nouvelle est fournie
    if (req.file) {
        try {
            uploadedFile = await cloudinary.uploader.upload(
                req.file.path, // Le fichier à uploader
                {
                    folder: "garage_auto/services", // Le dossier dans lequel stocker le fichier
                    resource_type: "image" // le type de ressource à uploader
                });

            // Supprimer le fichier local après l'upload
            await fs.promises.unlink(req.file.path, (err) => {
                if (err) {
                    console.error("Erreur lors de la suppression du fichier temporaire:", err);
                } else {
                    console.log("Fichier temporaire supprimé avec succès.");
                }
            });

        } catch (error) {
            console.error('Erreur lors de l\'upload de l\'image vers Cloudinary :', error);
            // Si l'upload échoue, renvoyez une erreur sans créer de service
            return res.status(500).json({ message: 'Erreur lors de l\'upload de l\'image.' });
        }
        // Mettre à jour fileData avec les informations de l'image uploadée
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        };
    }

    const newService = {
        title,
        description,
        image_path: fileData.filePath // Utiliser l'URL de l'image ou null si aucune image
    };

    // Créer le service avec l'image_path si disponible
    try {

        const createdService = await createService(newService);
        if (createdService) {
            return res.status(201).json({
                message: "Service créé avec succès",
                service: createdService
            });
        }
    } catch (error) {
        console.error('Erreur lors de la création du service :', error);
        return res.status(500).json({ message: error.message });
    }
});

// Update a service
export const updateOneService = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    // Récupérer le service à modifier
    const service = await getService(id);
    if (!service) {
        return res.status(404).json({ message: "Service non trouvé" });
    }
    
    // Valider les données
    if (!title || !description) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }

    // Traiter l'image
    let fileData = {};
    let uploadedFile;

    // Traiter l'image si une nouvelle est fournie
    if (req.file) {
        console.log('Fichier reçu:', req.file.path);

        try {
            uploadedFile = await cloudinary.uploader.upload(
                req.file.path, // Le fichier à uploader
                {
                    folder: "garage_auto/services", // Le dossier dans lequel stocker le fichier
                    resource_type: "image" // le type de ressource à uploader
                });

            // Supprimer le fichier local après l'upload
            await fs.promises.unlink(req.file.path, (err) => {
                if (err) {
                    console.error("Erreur lors de la suppression du fichier temporaire:", err);
                } else {
                    console.log("Fichier temporaire supprimé avec succès.");
                }
            });

        } catch (error) {
            console.error('Erreur lors de l\'upload de l\'image vers Cloudinary :', error);
            // Si l'upload échoue, renvoyez une erreur sans créer de service
            return res.status(500).json({ message: 'Erreur lors de l\'upload de l\'image.' });
        }
        // Mettre à jour fileData avec les informations de l'image uploadée
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        };
    }else{
        console.log('Aucun fichier reçu');
    }
    const imagePath = fileData.filePath ? fileData.filePath : service.image_path;

    const updatedService = {
        title : title || service.title,
        description : description || service.description,
        image_path: imagePath 
    };
    try{
        const serviceUpdated = await updateService(id, updatedService);
        if (serviceUpdated) {
            return res.status(200).json({
                message: "Service mis à jour avec succès",
                service: serviceUpdated
            });
        }

    }catch(error){
        console.error('Erreur lors de la mise à jour du service :', error);
        return res.status(500).json({ message: error.message });
    }
    
});

// Delete a service
export const deleteOneService = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const service = await getService(id);
        if (!service) {
            return res.status(404).json({ message: "Service non trouvé" });
        }
        await deleteService(id);
        return res.status(200).json({ message: "Service supprimé avec succès" });
    } catch (error) {
        console.error('Erreur lors de la suppression du service :', error);
        return res.status(500).json({ message: error.message });
    }
});