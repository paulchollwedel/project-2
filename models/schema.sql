DROP DATABASE IF EXISTS instaArt;
CREATE DATABASE instaArt;

USE instaArt;

CREATE TABLE artists (
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(45) NULL,
    lastname VARCHAR(45) NULL,
    username VARCHAR(45) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE artwork (
    id INT NOT NULL AUTO_INCREMENT,
    artist_id INT NOT NULL,
    title VARCHAR(45) NULL,
    img_url VARCHAR(100) NULL,
    price INT NULL,
    in_stock INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE customers (
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(45) NULL,
    lastname VARCHAR(45) NULL,
    username VARCHAR(45) NULL,
    credit_card INT NULL,
    mailing_address VARCHAR(45) NULL,
    PRIMARY KEY (id)
);