-- Crear base de datos
CREATE SCHEMA `mars_dsp` DEFAULT CHARACTER SET utf8 ;
USE  `mars_dsp`;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS `mars_dsp`.`usuario` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL DEFAULT 'El nombre es obligatorio',
  `password` VARCHAR(45) NOT NULL DEFAULT 'La contraseña es obligatoria',
  `img` VARCHAR(45) NULL,
  `rol` VARCHAR(45) NOT NULL DEFAULT 'El rol es obligatorio',
  `estado` BINARY(1)  DEFAULT TRUE,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;



