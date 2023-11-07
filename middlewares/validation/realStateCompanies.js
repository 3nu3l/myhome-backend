const { check, validationResult } = require('express-validator');

exports.validateRealStateCreate = [
  check('fantasyName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('El nombre de fantasía es requerido'),
  check('email').normalizeEmail().isEmail().withMessage('Correo electronico inválido.'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('La contraseña se encuentra vacía!')
    .matches(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,16}$/)
    .withMessage('Ingrese una contraseña válida. Debe poseer: entre 8 y 16 caracteres alfanuméricos, dos letras mayúsculas,un caracter especial, elegir entre: !@#$&*, tres letras minúsculas, dos números'),
  check('role')
    .trim()
    .not()
    .isEmpty()
    .isIn(['business'])
    .withMessage('Rol inválido, debe ser "business"'),
];

exports.rscValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.status(400).json({ success: false, message: error });
};