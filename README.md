Application Web pour Garage Automobile


Ce projet, développé dans le cadre de ma formation en développement web et mobile, est une application web pour un garage automobile. L'objectif est de fournir une plateforme où les clients peuvent explorer les services offerts, consulter les voitures d'occasion, connaître les horaires d'ouverture et contacter le garage. L'application inclut également un espace d'administration pour gérer les contenus et les requêtes clients.



Configuration et Lancement en Local

 
Prérequis : 
Il faudra au préalable installer sur votre machine 
Node.js
MySQL


Étapes d'Installation
Cloner le dépôt GitHub
1 - Dans votre terminal, accéder à votre répertoire de développement : 
     cd Votre_répertoire
2 - Cloner le projet github
     git clone https://github.com/isiis0406/garage_auto.git
Installer les dépendances du serveur
1 - accéder au répertoire backend du projet : 
    cd garage_auto/Backend
2 - Installer les dépendances du backend 
    npm install ou yarn add 

Configurer la base de données MySQL
Exécutez les scripts SQL fournis pour créer une base de données MySQL et pour initialiser les tables.

Le script sql se trouve dans le dossier  : 
Path du dossier : Backend/database/script
	Nom du fichier : db_script.sql

Configurer les variables d'environnement du serveur
1 - Dupliquer le fichier .example.env et renommer la copie en .env 
2 - Renseigner les informations des variables avec les configurations nécessaires 
(ex : chaîne de connexion MySQL, clé secrète JWT, etc.).

Lancer le serveur backend 
npm start server.js
Installer les dépendances du client (partie frontend)
Ouvrir un nouveau terminal
	1 - accéder au répertoir de la partie frontend
                cd client
	2 - installer les dépendances 
                npm install ou yarn add

Lancer l'application React
npm run start
L'application sera disponible à l'adresse localhost:3001.
Création d'un Compte Administrateur
Pour accéder à l'espace d'administration de l'application, il est nécessaire de créer un compte administrateur. Ce processus s'effectue en exécutant un script SQL directement dans votre base de données MySQL.

Étapes pour Créer un Compte Administrateur via SQL :
Vérification de la Base de Données :
Assurez-vous que la base de données MySQL de l'application est correctement installée et opérationnelle.

Connexion au Serveur MySQL :
Connectez-vous à votre serveur MySQL à l'aide d'un outil de gestion de base de données tel que MySQL Workbench, phpMyAdmin, ou via la ligne de commande.

Exécution du Script SQL :
Exécutez le script SQL suivant pour créer un compte administrateur. Remplacez votre_nom_utilisateur et votre_email par les identifiants de votre choix :

INSERT INTO users (name, email, role)
VALUES ('votre_nom_utilisateur', 'votre_email', 'admin');

Activation du Compte :
Vous recevrez un email sur l'adresse fournie pour activer le compte et créer un mot de passe.

Connexion à l'Interface :
Une fois le compte activé, vous pouvez vous connecter à l'interface d'administration en utilisant l'URL suivante : http://localhost:3001/login.

URL de l'Espace Administration :
Accédez à l'espace administrateur via : http://localhost:3001/admin.

Sécurité :
Confidentialité : Il est crucial de ne pas divulguer les informations du compte administrateur et de les sécuriser adéquatement.

Auteurs et Contribution:
Ce projet a été réalisé par BALDE Issa Bobo, étudiant en développement web sur le parcours développeur web full stack. Toutes contributions ou suggestions sont les bienvenues.

