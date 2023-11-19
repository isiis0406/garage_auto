import asyncHandler from 'express-async-handler';
import { getAllUsers, getUserById, getUserByEmail, createUser, updateUserById, deleteUserById } from '../../database/queries/auth/userquery.js';
import { getToken, createToken, deleteToken } from '../../database/queries/auth/tokenquery.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../../utils/sendEmail.js';


// Fonction pour formater la date d'expiration du token en UTC
const formatTokenExpiration = (duration, unit) => {
  const unitsToMs = {
    'h': 3600000,
    'm': 60000,
    's': 1000
  };
  const durationInMs = duration * (unitsToMs[unit] || 0);
  const expiresAt = new Date(Date.now() + durationInMs);
  return expiresAt.toISOString();
};

// Fonction pour vérifier si le token a expiré
const hasTokenExpired = (expiresAtSql) => {

  const expiresAt = new Date(expiresAtSql + 'Z'); // Ajout de 'Z' pour clarifier que c'est en UTC.
  // L'heure actuelle en UTC.
  const nowUtc = new Date();
  return nowUtc > expiresAt; // Si maintenant est plus grand que l'expiration, le token a expiré.
};



// Register user
export const userRegister = asyncHandler(async (req, res) => {
  // Extraction des données envoyées par l'utilisateur
  const { name, email, role } = req.body;

  // Validation des données reçues
  if (!name || !email || !role) {
    // Si une des données est manquante, envoie une réponse d'erreur
    return res.status(400).json({ message: "Veuillez saisir tous les champs" });
  }
  console.log(name, email, role);

  // Vérification si l'adresse email est déjà utilisée
  const userExists = await getUserByEmail(email);
  if (userExists) {
    // Si l'adresse email existe déjà, envoie une réponse d'erreur
    return res.status(400).json({ message: "Adresse email déjà utilisée" });
  }


  // Formatage de l'adresse email en minuscules
  const formatedEmail = email.toLowerCase();

  

  // Création d'un nouvel utilisateur dans la base de données
  const result = await createUser(name, formatedEmail, role);

  // Si l'utilisateur est créé avec succès, procéder avec la création du token de réinitialisation
  if (result.insertId) {
    const userId = result.insertId;

    // Suppression de l'ancien token s'il existe
    const oldToken = await getToken(userId);
    if (oldToken) {
      await deleteToken(oldToken.id);
    }

    // Création du token de réinitialisation
    let resetToken = crypto.randomBytes(32).toString('hex') + userId;

    // Hachage du token avant de l'enregistrer dans la base de données
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Création de la date d'expiration du token
    const expiresAt = new Date(Date.now() + 1440 * 60 * 1000);
    const expiresAtSql = expiresAt.toISOString().slice(0, 19).replace('T', ' ');
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // Enregistrement du token haché dans la base de données
    await createToken(userId, hashedToken, createdAt, expiresAtSql);

    // Construction de l'URL de réinitialisation du mot de passe
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    // Préparation du message d'email de réinitialisation
    const message = `
      <h2>Salut ${name}</h2>
      <p>Votre administrateur Garage automobile vient de vous créer un compte utilisateur afin que vous accédiez à la plateforme.</p>
      <p>Cliquez sur le lien suivant pour enregistrer votre mot de passe et accéder à l'application :</p>
      <p>Ce lien est valide pour seulement 24 heures.</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      <p>Bienvenue 😉 ...</p>
      <h3>Équipe Garage Auto</h3>
    `;

    // Configuration de l'email à envoyer
    const subject = '🛂 Activation de votre compte - Garage Auto';
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;

    // Envoi de l'email
    try {
      await sendEmail(subject, message, send_to, sent_from);
      // Envoie d'une réponse de succès si l'email est envoyé
      return res.status(201).json({ message: 'Utilisateur créé avec succès et email envoyé' });
    } catch (error) {
      // En cas d'erreur d'envoi de l'email, envoie une réponse d'erreur
      console.error(error.message);
      return res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'email, veuillez réessayer' });
    }
  } else {
    // Envoie d'une réponse d'erreur si la création de l'utilisateur échoue
    return res.status(400).json({ message: "Erreur lors de la création de l'utilisateur" });
  }
});


// Get all users
export const getUsers = asyncHandler(async (req, res) => {
  try {
    // Récupérer tous les utilisateur depuis la base de données
    const users = await getAllUsers();

    // Vérifier s'il y a des users
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
    }
    // Renvoyer les users au format JSON
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
  }
});

// Get One User By Id
export const getUser = asyncHandler(async (req, res) => {
  try {
    // Récupérer l'identifiant du user depuis les paramètres de la requête
    const { id } = req.params;

    // Récupérer le user dans la base de données
    const user = await getUserById(id);
    console.log(user);
    if (user) {
      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      })
    } else {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur.' });
  }
});



//Update user
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params; // Récupération de l'ID de l'utilisateur depuis les paramètres de la requête
  const { name, email, role } = req.body; // Récupération des nouvelles valeurs depuis le corps de la requête

  // Récupération de l'utilisateur actuel pour s'assurer qu'il existe
  const user = await getUserById(id);
  
  if (user) {
    // Mise à jour de l'utilisateur avec les nouvelles valeurs ou les anciennes si aucune nouvelle n'est fournie
    const result = await updateUserById(
      id,
      name || user.name,
      email || user.email,
      role || user.role
    );

    // Si la mise à jour est réussie, envoie une réponse avec le résultat
    return res.status(200).json({
      message: 'Utilisateur modifié avec succès',
      user: {
        id: id,
        name: name || user.name,
        email: email || user.email,
        role: role || user.role
      }
    });
  } else {
    // Si aucun utilisateur n'est trouvé avec l'ID fourni, envoie une réponse d'erreur
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});


// Delete an existing user by ID
export const deleteUser = asyncHandler(async (req, res) => {
  
  // Récupérer l'identifiant du user depuis les paramètres de la requête
  const { id } = req.params;
  try {
    // Vérifier si l'utilisateur existe dans la base de données
    const existingUser = await getUserById(id);
    
    // Si l'utilisateur n'existe pas, renvoyer une réponse 404
    if (!existingUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    
    // Supprimer l'utilisateur de la base de données
    const result = await deleteUserById(id);
    console.log(result);
    return res.status(200).json({ message: 'Utilisateur supprimé avec succèss' });

  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
});

