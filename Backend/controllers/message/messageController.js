import asyncHandler from 'express-async-handler';
import { getMessage, getMessages, createMessage, archiveMessage, deleteMessage } from '../../database/queries/messages/messagequery.js';
import { sendEmail } from '../../utils/sendEmail.js';



// Fonction auxiliaire pour valider une adresse email
const validateEmail = (email) => {
    // Expression régulière pour valider une adresse email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


// Récupérer tous les messages
export const getAllMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await getMessages();
        if (messages) {
            return res.status(200).json(messages);
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des messages", error: error.message });
    }
});

// Récupérer un message
export const getOneMessage = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const message = await getMessage(id);
        if (message) {
            return res.status(200).json(message);
        }else{
            return res.status(404).json({ message: "Message non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du message", error: error.message });
    }
});

// Créer un message
export const postMessage = asyncHandler(async (req, res) => {
    const { name, phone, email, message } = req.body;

    // Vérifier que tous les champs sont remplis
    if (!name || !phone || !email || !message) {
        return res.status(400).json({ message: "Merci de remplir tous les champs." });
    }

    // L'adresse email doit être valide
    if (!validateEmail(email)) {
        return res.status(400).json({ message: "Merci de renseigner une adresse email valide." });
    }

    // Le téléphone doit être valide
    if (phone.length < 10 || phone.length > 14 || isNaN(phone) || phone.includes(' ') || phone.includes('-') || phone.includes('.')) {
        return res.status(400).json({ message: "Merci de renseigner un numéro de téléphone valide. Ex: 0785854145" });
    }

    // Créer un objet message
    const newMessage = {
        name,
        phone,
        email,
        message
    }
    // Créer le message dans la base de données
    const messageCreated = await createMessage(newMessage);
    if (messageCreated) {
        // Construction de l'URL du message
        const messageUrl = `${process.env.FRONTEND_URL}/messages/${messageCreated.id}`;

        // Préparation des 2 messages d'email du message
        const userMessage = `
        <h2>Salut ${name}</h2>
        <p>Votre message a bien été envoyé à l'administrateur du Garage Auto.</p>
        <p> Il sera traité dans les plus brefs délais.</p>
        
        <p> Merci pour votre confiance.</p>
        <h3>Équipe Garage Auto</h3>
        `;

        const adminMessage = `
        <h2>Salut Admin</h2>
        <p>Vous avez reçu un nouveau message de ${name}.</p>
        <p>Voici son contenu :</p>
        <p>${message}</p>
        <p>Vous pouvez le consulter en cliquant sur le lien suivant :</p>
        <a href=${messageUrl} clicktracking=off>${messageUrl}</a>
        <p>À bientôt.</p>
        <h3>Équipe Garage Auto</h3>
        `;

        // Configuration des emails à envoyer
        const userSubject = '🛂 Message envoyé - Garage Auto';
        const userSend_to = email;
        const userSent_from = process.env.EMAIL_USER;

        const adminSubject = '🛂 Nouveau message - Garage Auto';
        const adminSend_to = process.env.EMAIL_USER;
        const adminSent_from = process.env.EMAIL_USER;

        // Envoi des emails
        try {
            await sendEmail(userSubject, userMessage, userSend_to, userSent_from);
            await sendEmail(adminSubject, adminMessage, adminSend_to, adminSent_from);
            // Envoie d'une réponse de succès si les emails sont envoyés
            return res.status(201).json({ message: 'Message créé avec succès et emails envoyés' });
        } catch (error) {
            // En cas d'erreur d'envoi de l'email, envoie une réponse d'erreur
            console.error(error.message);
            return res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'email, veuillez réessayer' });
        }
    } else {
        return res.status(400).json({ message: "Erreur lors de la création du message" });
    }


});

// Archiver un message
export const archiveOneMessage = asyncHandler(async (req, res) => {
    try {
        const message = await archiveMessage(req.params.id);
        if (message) {
            return res.status(200).json({
                message: "Message archivé avec succès",
                archivedMessage: message

            });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'archivage du message", error: error.message });
    }
});

// Supprimer un message
export const deleteOneMessage = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    try {
        const message = await deleteMessage(req.params.id);
        if (message) {
            return res.status(200).json({ message: "Message supprimé avec succès" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du message", error: error.message });
    }
});