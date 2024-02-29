

DROP TABLE if exists bookmarks;


CREATE TABLE bookmarks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(255),
  temperature FLOAT,
  description VARCHAR(255) 
);


DROP TABLE if exists users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL
);





