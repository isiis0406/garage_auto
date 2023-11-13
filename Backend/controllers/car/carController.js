import { getAllCars, createCar, getCarById, updateCar, deleteCar } from '../../database/queries/car/carquery.js';
import asyncHandler from 'express-async-handler';
import { fileSizeFormatter, upload } from '../../utils/fileUpload.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


// Get all cars
export const getCars = asyncHandler(async (req, res) => {
    try {
        const cars = await getAllCars();
        if (!cars) {
            return res.status(404).json({ message: "Voitures non trouvées" });
        }
        return res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Create a car
export const createOneCar = asyncHandler(async (req, res) => {
    const { brand, model, release_year, price, description, kilometers } = req.body;
    console.log(brand, model, release_year, price, description, kilometers);
    // Valider les données
    if (!brand || !model || !release_year || !price || !description || !kilometers) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }
    //Traiter l'image
    let fileData = {};
    let uploadedFile;

    if (req.file) {
        //Enregistrer l'image dans Cloudinary
        try {
            uploadedFile = await cloudinary.uploader.upload(
                req.file.path, // Le fichier à uploader
                {
                    folder: "garage_auto", // Le dossier dans lequel stocker le fichier
                    resource_type: "image" // le type de ressource à uploader
                })

            // Supprimer le fichier après l'upload
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error("Erreur lors de la suppression du fichier temporaire:", err);
                } else {
                    console.log("Fichier temporaire supprimé avec succès.");
                }
            });
        } catch (error) {
            console.error('Erreur lors de l\'upload de l\'image vers Cloudinary :', error);
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)

        }
    }
    const newCar = {
        brand,
        model,
        release_year,
        price,
        description,
        image_path: fileData.filePath,
        kilometers
    }
    try {
        const createdCar = await createCar(newCar);
        if (createdCar) {
            return res.status(201).json({
                message: "Voiture créée avec succès",
                car: createdCar
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Get a car
export const getOneCar = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const car = await getCarById(id);
        if (!car) {
            return res.status(404).json({ message: "Voiture non trouvée" });
        }
        return res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Update a car
export const updateOneCar = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { brand, model, release_year, price, description, kilometers } = req.body;

    // Valider les données
    if (!brand || !model || !release_year || !price || !description || !kilometers) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }

    // Trouver la voiture à modifier
    const carToUpdate = await getCarById(id);
    if (!carToUpdate) {
        return res.status(404).json({ message: "Voiture non trouvée" });
    }

    let filePath = carToUpdate.image_path;
    // Traiter l'image si une nouvelle est fournie
    if (req.file) {
        // Supprimer l'image existante depuis Cloudinary
        const publicId = filePath.split('/').pop().split('.')[0];
        try {
           await cloudinary.uploader.destroy(publicId);
           console.log('Image supprimée depuis Cloudinary');
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'image depuis Cloudinary :', error);

        }
        

        // uploader la nouvelle image sur Cloudinary
        const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
            folder: "garage_auto",
            resource_type: "image"
        });

        if (uploadedFile) {
            // Mettre à jour le chemin de l'image avec le nouveau
            filePath = uploadedFile.secure_url;
        }
        // Supprimer le fichier temporaire
        await fs.promises.unlink(req.file.path);
    }

    // Mise à jour des informations de la voiture
    const updateData = {
        brand,
        model,
        release_year,
        price,
        description,
        image_path: filePath,
        kilometers
    };

    try {
        // Enregistrer les modifications
        const updatedCar = await updateCar(id, updateData);
        if (updatedCar) {
            return res.status(200).json({
                message: "Voiture modifiée avec succès",
                car: updatedCar
            });
        } else {
            return res.status(400).json({ message: "La mise à jour de la voiture a échoué" });
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la voiture :', error);
        return res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
});

// Delete a car
export const deleteOneCar = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const carToDelete = await getCarById(id);
    if (!carToDelete) {
        return res.status(404).json({ message: "Voiture non trouvée" });
    }
    // Supprimer l'image depuis Cloudinary
    if(carToDelete.image_path){
        const publicId = carToDelete.image_path.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId).then(result => console.log(result));
       
    }
    // Supprimer la voiture
    try {
        const deletedCar = await deleteCar(id);
        if (deletedCar) {
            return res.status(200).json({ message: "Voiture supprimée avec succès" });
        } else {
            return res.status(400).json({ message: "La suppression de la voiture a échoué" });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la voiture :', error);
        return res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
});