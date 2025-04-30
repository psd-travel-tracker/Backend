create schema if not exists  psd;
use psd;
CREATE TABLE trip
(
    `id`            INT(11) NOT NULL auto_increment ,
    `name`          VARCHAR(255) NOT NULL ,
    `userId`        INT NULL ,
    `created_at`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    `updated_at`    DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    PRIMARY KEY (`id`),
    UNIQUE `idx_name_unique` (`name`(255))
);
INSERT INTO trip(id,name,userId)
VALUES
    (1,'Croatia',1991),
    (2,'Bulgaria',1991),
    (3,'Italy',1995);
use psd;
CREATE TABLE expense (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  cost INT,
  userId INT,
  categoryId INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  archived_at DATETIME,
  tripId INT NOT NULL,
  PRIMARY KEY (id)
);
INSERT INTO expense (name, description, cost, userId, categoryId, tripId)
VALUES 
  ('Lunch at airport', 'Burger and drink', 18, 1, 2, 1),
  ('Hotel', '2 nights stay at hotel', 240, 1, 3, 1),
  ('Taxi', 'Ride from airport to hotel', 35, 1, 1, 1);