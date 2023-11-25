const express = require('express');
var cors = require('cors')

const router = express.Router();
const {
  getFavoriteProperties,
  createFavoriteProperties,
  putFavoriteProperties,
  deleteFavoriteProperty
} = require('../../controllers/favorites');
const { isAuth } = require('../../middlewares/config/auth');

router.post('/users/favorites', cors(), isAuth, createFavoriteProperties);
router.get('/users/:id/favorites', cors(), isAuth, getFavoriteProperties);
router.put('/users/favorites', cors(), isAuth, putFavoriteProperties);
router.delete('/users/:id/favorites/:favoriteid', cors(), isAuth, deleteFavoriteProperty);

module.exports = router;
