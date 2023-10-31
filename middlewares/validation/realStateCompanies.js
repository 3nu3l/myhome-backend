const { check, validationResult } = require('express-validator');

exports.validateRealStateCreate = [
  check('fantasyName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('El nombre de fantasía es requerido'),
  check('contactEmail').normalizeEmail().isEmail().withMessage('Correo electronico inválido.'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('La contraseña se encuentra vacía!')
    .matches(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,16}$/)
    .withMessage('Ingrese una contraseña válida. Debe poseer: entre 8 y 16 caracteres alfanuméricos, dos letras mayúsculas,un caracter especial, elegir entre: !@#$&*, tres letras minúsculas, dos números'),
];
