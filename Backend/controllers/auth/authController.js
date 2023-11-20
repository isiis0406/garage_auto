import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendEmail } from '../../utils/sendEmail.js';
import { getUserByEmail, updateUserById, getUserById } from '../../database/queries/auth/userquery.js';
import { deleteToken, getToken, createToken, getTokenByToken } from '../../database/queries/auth/tokenquery.js';
import { changePasswordById, getAuthUserById } from '../../database/queries/auth/authquery.js';


//Genener le token for l'authentification des utilisateurs
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// Fonction pour formater la date d'expiration du token en UTC
const formatTokenExpiration = (duration, unit) => {
  const unitsToMs = {
    'h': 3600000,
    'm': 60000,
    's': 1000
  };
  const durationInMs = duration * (unitsToMs[unit] || 0);
  const expiresAt = new Date(Date.now() + durationInMs);

  // Formatage pour MySQL
  return expiresAt.toISOString().slice(0, 19).replace('T', ' ');
};

// Fonction pour vérifier si le token a expiré
const hasTokenExpired = (expiresAtSql) => {

  const expiresAt = new Date(expiresAtSql + 'Z'); // Ajout de 'Z' pour clarifier que c'est en UTC.
  // L'heure actuelle en UTC.
  const nowUtc = new Date();
  return nowUtc > expiresAt; // Si maintenant est plus grand que l'expiration, le token a expiré.
};

// Fonction pour hasher le mot de passe
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
// Fonction pour hasher le token
const hashToken = async (token) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  return hashedToken;
};

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Veuillez saisir un email et un mot de passe." });
  }

  const formattedEmail = email.toLowerCase();

  // Vérifiez si l'utilisateur existe
  const user = await getUserByEmail(formattedEmail);

  if (user && user.password) {
    // Vérifiez si le mot de passe est correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (passwordIsCorrect) {
      // Générez le token
      const token = generateToken(user.id); // Générez le token avec l'ID 

      // Envoyez un cookie HTTP sécurisé
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // Un jour
        sameSite: "none",
        secure: true
      });

      return res.status(200).json({
        message: 'Connexion réussie.',
        id: user.id,
        name: user.name,
        email: user.email,
        token
      });
    }
  }

  // Message neutre pour les erreurs d'authentification
  return res.status(401).json({ message: "Informations incorrectes" });
});

//Logout User
export const logoutUser = asyncHandler((req, res) => {
  // Send Http-only cookie
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(Date(0)), // Know current second
    sameSite: "none",
    secure: true

  });
  res.status(200).json({
    message: "Déconnecté avec succès"
  })
})

//Get Login status
export const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  //Verifier le token 
  const isVerified = jwt.verify(token, process.env.JWT_SECRET);
  if (isVerified) {
    res.json(true)
  } else {
    res.json(false);
  }
});

// Update User password
export const changePassword = asyncHandler(async (req, res) => {
  console.log('hey');
  const id = req.user.id;
  if (!id) {
    return res.status(404).json({ message: 'Veillez vous authentifier' });
  }
  const user = await getAuthUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'Veillez vous authentifier' });
  }
  const { oldPassword, password } = req.body;
  //Validate
  if (!oldPassword || !password) {
    return res.status(404).json({ message: "Veillez saisir l'ancien et le nouveau mot de passe" });
  }
  if (password.length < 6) {
    return res.status(404).json({ message: "Le mot de passe doit contenir au moins 6 charactères" });
  }
  // Password matches
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);
  //Save new password
  if (user && passwordIsCorrect) {
    //Verify if the new password is equal to the old Password
    const isSamePassword = await bcrypt.compare(req.body.password, user.password);
    if (isSamePassword) {
      return res.status(404).json({ message: "Le nouveau mot de passe ne peut pas être identique à l'ancien" });
    }
    //Hash new password
    const hashedPassword = await hashPassword(password);

    //Update password
    const result = await changePasswordById(user.id, hashedPassword);
    if (!result) {
      return res.status(404).json({ message: "Mot de passe non modifié" });
    }
    //Send response
    return res.status(200).json({ message: "Mot de passe modifié avec succèss" })
  } else {
    return res.status(404).json({ message: "Mot de passe incorrect" });
  }
})

// Forgot Password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(404).json({ message: 'Veillez saisir une adresse email' })
  }

  //Formattez l'email
  const formattedEmail = email.toLowerCase();
  // Vérifier si l'utilisateur existe
  const user = await getUserByEmail(formattedEmail);
  if (!user) {
    res.status(404).json({ message: "Veillez saisir une adresse email valide" });
  }
  //Supprimer l'ancien token si il existe
  const oldToken = await getToken(user.id);
  if (oldToken) {
    await deleteToken(oldToken.id);
  }
  // Créer un token
  let resetToken = crypto.randomBytes(32).toString('hex') + user.id;

  // Hasher le token avant de l'enregistrer dans la base de données
  const hashedToken = await hashToken(resetToken);

  // Création de la date d'expiration du token
  const expiresAt = formatTokenExpiration(30, 'm');

  // Création de la date de création du token
  const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // Enregistrer le token dans la base de données
  await createToken(user.id, hashedToken, created_at, expiresAt);

  //Construction du reset url
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

  //Reset Email 
  const message = `
    <h2>Salut ${user.name}</h2>
    <p>Vous avez récemment déclenché un processus de réinitialisation de votre mot de passe sur la plateforme Garage Auto</p>
    <p>Cliquer sur le lien suivant pour réinitialiser votre mot de passe</p>
    <p> Ce mot de passe est valide pour seulement 30 minutes</p>

    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    
    <p>Cordialement ...</p>
    <h3>Garage auto Team<h3/>
    `;

  const subject = '🛂 Réinitialisation de mot de passe - Garage auto'
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    return res.status(200).json({ success: 'true', message: 'Mail de reinitialisation envoyé' })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: 'Mail non envoyé, veillez réessayer' });
  }

})

// Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword } = req.body
  const { resetToken } = req.params;

  //Validations
  if (!password || !confirmPassword) {
    return res.status(404).json({ message: 'Veillez saisir tous les champs' });
  }
  if (password && password.length < 6) {
    return res.status(404).json({ message: "Le mot de passe doit contenir au moins 6 charactères" });
  }
  if (password != confirmPassword) {
    return res.status(400).json({ message: 'Les mot de passes saisis ne correspondent pas' })
  }
  //Hasher le token et le comparer avec celui enregistré dans la base de données
  const hashedToken = await hashToken(resetToken);
  // Trouver le token dans la base de données
  const userToken = await getTokenByToken(hashedToken);

  if (!userToken) {
    return res.status(404).json({ message: 'Lien invalid' });
  }

  const tokenExpires = hasTokenExpired(userToken.expiresAt);
  if (tokenExpires) {
    // Le token a expiré
    return res.status(404).json({ message: 'Lien expiré, veuillez réessayer.' });
  }
  // trouver l'utilisateur dans la base de données
  const user = await getUserById(userToken.userId);

  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
  // Hasher le nouveau mot de passe
  const hashedPassword = await hashPassword(password);

  // Enregistrer le nouveau mot de passe
  await changePasswordById(user.id, hashedPassword);

  // Supprimer le token de la base de données
  await deleteToken(userToken.id);
  return res.status(200).json({ message: 'Mot de passe modifié avec succès, veillez vous authentifié' })

})


// Get Auth User
export const getAuthUser = asyncHandler(async (req, res) => {
    const id = req.user.id;
    if (!id) {
      return res.status(404).json({ message: 'Veillez vous authentifier' });
    }
    const user = await getAuthUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Veillez vous authentifier' });
    }
    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
});
