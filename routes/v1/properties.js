const express = require('express');
var cors = require('cors')

const router = express.Router();
const {
    createProperty,
    getProperties,
    updateProperty,
    updateFieldProperty,
} = require('../../controllers/properties');
const { isAuth } = require('../../middlewares/config/auth');
// validaciones de lógica del contenido de los campos que se envían
// const {

// } = require('../../middlewares/validation/properties');

router.post('/properties', cors(), isAuth, createProperty);
router.get('/properties', cors(), isAuth, getProperties);
router.put('/properties/:id', cors(), isAuth, updateProperty);
router.patch('/properties/:id', cors(), isAuth, updateFieldProperty);

module.exports = router;
