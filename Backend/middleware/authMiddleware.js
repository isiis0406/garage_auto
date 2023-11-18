import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { getUserById } from '../database/queries/auth/userquery.js';

export const protect = asyncHandler( async (req, res, next) => {

    try {
        const token = req.cookies.token;
        console.log(token);
        if(!token){
            res.status(401).json({message: "Non authorisé, veillez vous authentifié"});
        }
        //Verifier le token 
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        if(verified){
            // Récupérer l'id via le token
            const user = await getUserById(verified.id);
            // Utilisateur non trouvé
            if(!user){
                res.status(401).json({message: 'Non authorisé, veillez vous authentifié'})        
            }
            // Utilisateur trouvé - Insérrer l"utilisateur dans la requete
            req.user = user;
            next();
        }
    } catch (error) {
        res.status(401).json({message: 'Non authorisé, veillez vous authentifié'})
    }
});