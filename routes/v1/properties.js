const express = require('express');
var cors = require('cors')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();
const {
    createProperty,
    getProperties,
    updateProperty,
    updateFieldProperty,
    getAppointments,
    createAppointments,
    deleteProperty,
    uploadPhotoProperty
} = require('../../controllers/properties');
const { isAuth } = require('../../middlewares/config/auth');
// validaciones de lógica del contenido de los campos que se envían
// const {

// } = require('../../middlewares/validation/properties');

router.post('/properties', cors(), isAuth, createProperty);
router.post('/properties/appointments', cors(), isAuth, createAppointments);
router.get('/properties', cors(), isAuth, getProperties);
router.post('/properties/:id/photo', cors(), isAuth, upload.single('photo'), uploadPhotoProperty);
router.get('/properties/appointments', cors(), isAuth, getAppointments);
router.put('/properties/:id', cors(), isAuth, updateProperty);
router.patch('/properties/:id', cors(), isAuth, updateFieldProperty);
router.delete('/properties/:id', cors(), isAuth, deleteProperty);

module.exports = router;
