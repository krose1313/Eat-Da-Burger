-- Create the database eat_da_burger_db and specified it for use.
CREATE DATABASE burgers_db;
USE burgers_db;

-- Create the table orders.
CREATE TABLE orders
(
id int NOT NULL AUTO_INCREMENT,
food_order varchar(255) NOT NULL,
devoured boolean DEFAULT false,  
PRIMARY KEY (id)
);

