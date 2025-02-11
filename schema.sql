create schema if not exists  psd;
use psd;
CREATE TABLE trips
(
    `id`            INT(11) NOT NULL auto_increment ,
    `name`          VARCHAR(255) NOT NULL ,
    `userId`        INT NULL ,
    `created_at`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    `updated_at`    DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    PRIMARY KEY (`id`),
    UNIQUE `idx_name_unique` (`name`(255))
);
INSERT INTO trips(id,name,userId)
VALUES
    (1,'Croatia',1995,1),
    (2,'Bulgaria',1991,2),
    (3,'Italy',1995,1);