-- Crear base de datos
CREATE SCHEMA  IF NOT EXISTS `mars_dsp` DEFAULT CHARACTER SET utf8 ;
USE  `mars_dsp`;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS `mars_dsp`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL DEFAULT 'El nombre es obligatorio',
  `password` VARCHAR(45) NOT NULL DEFAULT 'La contraseña es obligatoria',
  `img` VARCHAR(45) NULL,
  `rol` VARCHAR(45) NOT NULL DEFAULT 'El rol es obligatorio',
  `estado` BINARY(1)  DEFAULT TRUE,
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE  IF NOT EXISTS `mars_dsp`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rol` VARCHAR(45) NOT NULL DEFAULT 'USER_ROLE',
  PRIMARY KEY (`id`));



CREATE TABLE IF NOT EXISTS `mars_dsp`.`consumos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `numsilo` INT NOT NULL DEFAULT 1,
  `gruposilo` VARCHAR(45) NOT NULL DEFAULT 'Cementantes',
  `formula` VARCHAR(45) NOT NULL DEFAULT 'Pegapiso',
  `setpoint` FLOAT NOT NULL,
  `real` FLOAT NULL,
  `iduser` INT NOT NULL DEFAULT 1,
  `turno` INT NOT NULL DEFAULT 1,
  `createdAt` TIMESTAMP NULL,
  `updatedAt` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


  -- ADISION DE DATOS
INSERT INTO `mars_dsp`.`usuarios` (`nombre`, `password`) VALUES ('Oscar', '1234');
INSERT INTO `mars_dsp`.`roles` (`rol`) VALUES ('ADMIN_ROLE');
INSERT INTO `mars_dsp`.`roles` (`rol`) VALUES ('USER_ROLE');
INSERT INTO `mars_dsp`.`roles` (`rol`) VALUES ('SUPERVISOR_ROLE');
INSERT INTO `mars_dsp`.`roles` (`rol`) VALUES ('FORMULACION_ROLE');
INSERT INTO `mars_dsp`.`roles` (`rol`) VALUES ('MANTENIMIENTO_ROLE');



INSERT INTO `mars_dsp`.`consumos` (`numsilo`, `gruposilo`, `formula`, `setpoint`, `real`) VALUES ('1', 'Cementantes','PegaAzulejo', '502.36', '505.6');
INSERT INTO `mars_dsp`.`consumos` (`numsilo`, `gruposilo`, `formula`, `setpoint`, `real`) VALUES ('2', 'Aditivo','PegaAzulejo', '10.2', '10');
INSERT INTO `mars_dsp`.`consumos` (`numsilo`, `gruposilo`, `formula`, `setpoint`, `real`) VALUES ('3', 'Cementante','PegaAzulejo', '410.02', '523.2');
INSERT INTO `mars_dsp`.`consumos` (`numsilo`, `gruposilo`, `formula`, `setpoint`, `real`) VALUES ('4', 'Manual','PegaAzulejo', '20', '20');




