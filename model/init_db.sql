--
-- Drop Tables
--

-- SET foreign_key_checks = 0;
-- DROP TABLE if exists items;
-- SET foreign_key_checks = 1;

--
-- Create Tables
--


CREATE TABLE bookmarks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  temperature FLOAT NOT NULL,
  description VARCHAR(255) NOT NULL
);

