import { Router } from 'express';
import cors from 'cors';
import controllers from '../controllers/index';
import RFIDMiddleware from '../middlewares/rfid';
const router = Router();

router.use(cors());

router.get('', (req, res) => {
    res.send('api works');
});

// Ruta para crear una nueva visita con QR
router.post('/create-qr', controllers.qrController.createVisit);

// Ruta para validar un QR
router.post('/validate-qr', controllers.qrController.QRValidation);

// Ruta para crear una nueva entrada con código numérico
router.post('/create-code', controllers.numpadController.createCode);

// Ruta para validar un código numérico
router.post('/validate-code', controllers.numpadController.validateCode);

// Ruta para crear una nueva entrada con código RFID
router.post('/create-rfid', controllers.rfidController.createRFID);

// Ruta para validar y eliminar un código RFID
router.post('/validate-rfid', controllers.rfidController.validateRFID);

export default router;