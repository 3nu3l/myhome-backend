const express = require('express');
var cors = require('cors')

const router = express.Router();
const {
    createRSC,
    updateRSC,
    updateFieldRSC,
} = require('../../controllers/realStateCompanies');
const { isAuth } = require('../../middlewares/config/auth');
// validaciones de lógica del contenido de los campos que se envían
// const {

// } = require('../../middlewares/validation/realStateCompanies');

router.post('/real-state-companies', cors(), createRSC);
router.put('/real-state-companies', cors(), updateRSC);
router.patch('/real-state-companies', cors(), updateFieldRSC);


module.exports = router;
