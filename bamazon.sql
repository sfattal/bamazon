DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  stock_quantity INT(4) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Red Dead Redemption 2 PlayStation 4", "Video Games", "59.88", 20),
("DualShock 4 Wireless Controller for PlayStation 4 Jet Black", "Video Games", "46.69", 15),
("Carhartt Mens Acrylic Watch Hat", "Clothing", "9.99", 9),
("Champion Mens Powerblend Fleece Pullover Hoodie", "Clothing", "23.58", 12),
("Yankee Candle Large Jar Candle, Midsummers Night", "Home & Kitchen", "17.99", 17),
("Fleece Blanket Grey Microfiber", "Home & Kitchen", "25.99", 8),
("Burts Bees Natural Moisturizing Lip Balm 4 Tubes", "Beauty & Personal Care", "6.64", 10),
("Berocca Orange Flavor Effervescent Tablets 4 Tubes", "Beauty & Personal Care", "7.84", 8),
("Blue Buffalo Life Protection Formula Natural Adult Dry Dog Food", "Pet Supplies", "29.39", 5),
("Multipet Duckworth Duck Toy Large", "Pet Supplies", "8.41", 5)