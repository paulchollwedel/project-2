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
    buyer_id INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE customers (
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(45) NULL,
    lastname VARCHAR(45) NULL,
    username VARCHAR(45) NULL,
    credit_card VARCHAR(45) NULL,
    mailing_address VARCHAR(45) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE shopping_cart (
	id INT NOT NULL AUTO_INCREMENT,
    customer_id INT NULL,
    artwork_id INT NULL,
    quantity INT NULL,
    subtotal INT NULL,
);

INSERT INTO artists (firstname, lastname, username)
VALUES ("Lakshdeep", "Bajwa", "bajwals");

INSERT INTO artwork (artist_id, title, img_url, price, in_stock)
VALUES ("1", "Breathtaking Landscape", "https://puu.sh/F0HaZ/f50c72dd54.jpeg", 100, 1);

INSERT INTO customers (firstname, lastname, username, credit_card, mailing_address)
VALUES ("Diana", "Maynard", "mokoolaid", "0000", "1 Capitol Mall, Sacramento, CA");