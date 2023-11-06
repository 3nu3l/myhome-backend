const express = require('express');
var cors = require('cors')

const router = express.Router();
const {
  createUser,
  getUser,
  getUsers,
  userSignIn,
  signOut,
  updateUser,
  updateFieldUser,
  getFavoriteProperties,
  passwordReset,
  requestPasswordReset,
  deleteUser
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
router.post('/auths', cors(), userSignIn, validateUserSignIn, userValidation);
router.get('/users', cors(), isAuth, userValidation, getUser)
router.get('/users/properties', cors(), isAuth, getFavoriteProperties);
router.put('/users/:id', cors(), isAuth, updateUser);
//router.patch('/users/:id/reset-password', cors(), passwordReset)
router.patch('/users/reset-password', cors(), passwordReset)
router.patch('/users/:id', cors(), isAuth, updateFieldUser);
router.delete('/auths', cors(), isAuth, signOut);
router.delete('/users/:id', cors(), isAuth, deleteUser);
//router.get('/users/:email', cors(), isAuth, validateGetUser, userValidation, getUser)

module.exports = router;
