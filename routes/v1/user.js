const express = require('express');
var cors = require('cors')

const router = express.Router();
const {
  createUser,
  getUser,
  getUsers,
  userSignIn,
  signOut,
  passwordReset,
  requestPasswordReset
} = require('../../controllers/user');
const { isAuth } = require('../../middlewares/config/auth');
const {
  validateUserSignUp,
  userValidation,
  validateUserSignIn,
  validateGetUser,
  validateNewPassword
} = require('../../middlewares/validation/user');

router.post('/users', cors(), validateUserSignUp, userValidation, createUser);
//router.get('/users/:email', cors(), isAuth, validateGetUser, userValidation, getUser)
router.get('/users', cors(), isAuth, userValidation, getUser)
router.post('/auths', cors(), userSignIn, validateUserSignIn, userValidation);
router.delete('/auths', cors(), isAuth, signOut);
//router.put('/auths', cors(), validateNewPassword, passwordReset)
//router.get('/auths/:email', cors(), requestPasswordReset)

module.exports = router;
