import { Router } from 'express';
import controllers from '../controllers/index';
import qrMiddleware from '../middlewares/qr';
import numpadMiddleware from '../middlewares/numpad';
import RFIDMiddleware from '../middlewares/rfid';
const router = Router();

router.get('', (req, res) => {
    res.send('api works');
});

// Ruta para crear una nueva visita con QR
router.post('/create-visit', qrMiddleware.generateQRCode, controllers.qrController.createVisit);

// Ruta para validar un QR
router.post('/validate-qr', controllers.qrController.QRValidation);

// Ruta para crear una nueva entrada con código numérico
router.post('/create-code', numpadMiddleware.generateNumericCode, controllers.numpadController.createCode);

// Ruta para validar un código numérico
router.post('/validate-code', controllers.numpadController.validateCode);

// Ruta para crear un nuevo codigo RFID
router.post('/create-rfid', RFIDMiddleware.generateRFIDTag, controllers.rfidController.createRFID);

// Ruta para validar un código RFID
router.post('/validate-rfid', controllers.rfidController.validateRFID);

export default router;