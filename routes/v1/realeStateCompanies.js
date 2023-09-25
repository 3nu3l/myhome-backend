const express = require('express');
var cors = require('cors')

const router = express.Router();
const {
    createRSC,
    updateRSC,
    updateFieldRSC,
    getRSC,
    getOwnProperties
} = require('../../controllers/realStateCompanies');
const { isAuth } = require('../../middlewares/config/auth');
// validaciones de lógica del contenido de los campos que se envían
// const {

// } = require('../../middlewares/validation/realStateCompanies');

router.post('/real-state-companies', cors(), isAuth, createRSC);
router.get('/real-state-companies', cors(), isAuth, getRSC);
router.put('/real-state-companies/:id', cors(), isAuth, updateRSC);
router.patch('/real-state-companies/:id', cors(), isAuth, updateFieldRSC);
router.get('/real-state-companies/properties', cors(), isAuth, getRSC);

module.exports = router;
