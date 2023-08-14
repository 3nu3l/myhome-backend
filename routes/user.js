const express = require('express');
var cors = require('cors')

const router = express.Router();
// lógica de la api
const {
  createUser,
  getUser,
  getUsers,
  userSignIn,
  signOut,
  passwordReset,
  requestPasswordReset
} = require('../controllers/user');
// para que se use con el token despues de loguearse
const { isAuth } = require('../middlewares/config/auth');
// validaciones de lógica del contenido de los campos que se envían
const {
  validateUserSignUp,
  userValidation,
  validateUserSignIn,
  validateGetUser,
  validateNewPassword
} = require('../middlewares/validation/user');

router.post('/signUp', cors(), validateUserSignUp, userValidation, createUser);
router.get('/user/:email', cors(), isAuth, validateGetUser, userValidation, getUser)
router.get('/users', cors(), isAuth, userValidation, getUsers)
router.post('/signIn', cors(), userSignIn, validateUserSignIn, userValidation);
router.post('/signOut', cors(), isAuth, signOut);
router.post('/reset-password', cors(), validateNewPassword, passwordReset)
router.get('/request-reset-password/:email', cors(), requestPasswordReset)

module.exports = router;
