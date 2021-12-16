-- Crear base de datos
CREATE SCHEMA `mars_dsp` DEFAULT CHARACTER SET utf8 ;
USE  `mars_dsp`;

-- Crear tabla de usuarios
CREATE TABLE `mars_dsp`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombreusuario` VARCHAR(45) NOT NULL,
  `usuarioscol` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'Tabla de usuarios';