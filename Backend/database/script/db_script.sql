/* Script for creating database and tables */

/* Create database */
CREATE DATABASE IF NOT EXISTS `garage` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
/* Users */
CREATE TABLE users(
   id INT auto_increment,
   name VARCHAR(50),
   email VARCHAR(50),
   password VARCHAR(250),
   role enum('admin','employee'),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id)
);

/* Tokens */
CREATE TABLE tokens (
  id INT PRIMARY KEY auto_increment,
  userId INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL,
  expiresAt DATETIME NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) 
);

/* Services */
CREATE TABLE services(
   id INT auto_increment,
   title VARCHAR(50),
   description VARCHAR(250),
   image_path TEXT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id)
);

/* opening_hours */
CREATE TABLE opening_hours(
   id INT AUTO_INCREMENT,
   day ENUM('Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'),
   morning_hours VARCHAR(50),
   afternoon_hours VARCHAR(50),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id)
);

/* Cars */
CREATE TABLE cars(
   id INT AUTO_INCREMENT,
   brand VARCHAR(50),
   model VARCHAR(50),
   release_year INT,
   price DECIMAL(10, 2),
   description VARCHAR(250),
   image_path TEXT, 
   kilometers INT, 
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id)
  
);
/* Testimonials */
CREATE TABLE testimonials(
   id INT AUTO_INCREMENT,
   name VARCHAR(55) NOT NULL,
   email VARCHAR(55) NOT NULL,
   content VARCHAR(255), 
   rating INT,
   status enum('soumis','approuvé','archivé') DEFAULT 'soumis',
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id),
   CHECK (rating >= 1 AND rating <= 5) -- Ajout de la contrainte CHECK pour la notation
);

/* Messages */
CREATE TABLE messages(
   id INT auto_increment,
   name VARCHAR(50),
   phone VARCHAR(50),
   email VARCHAR(50),
   message TEXT,
   archived BOOLEAN DEFAULT FALSE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id)
);
