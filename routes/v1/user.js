const express = require('express');
var cors = require('cors')

const router = express.Router();
const {
  createUser,
  getUser,
  userSignIn,
  signOut,
  updateFieldUser,
  validateOTPAndChangePassword,
  requestPasswordReset,
  deleteUser
} = require('../../controllers/user');
const { isAuth } = require('../../middlewares/config/auth');
const {
  validateUserSignUp,
  userValidation,
  validateUserSignIn,
  validateNewPassword
} = require('../../middlewares/validation/user');

router.post('/users', cors(), validateUserSignUp, userValidation, createUser);
router.post('/auths', cors(), userSignIn, validateUserSignIn, userValidation);
router.get('/users', cors(), isAuth, userValidation, getUser)
router.post('/users/forgot-password', cors(), requestPasswordReset)
router.post('/users/reset-password', cors(), validateNewPassword, userValidation, validateOTPAndChangePassword)
router.patch('/users/:id', cors(), isAuth, updateFieldUser);
router.delete('/auths', cors(), isAuth, signOut);
router.delete('/users/:id', cors(), isAuth, deleteUser);

module.exports = router;
