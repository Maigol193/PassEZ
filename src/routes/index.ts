import { Router } from 'express';
import qrController from '../controllers/qr.controller';
import qrMiddleware from '../middlewares/qr';
const router = Router();

router.get('', (req, res) => {
    res.send('api works');
});

// Ruta para crear una nueva visita con QR
router.post('/create-visit', qrMiddleware.generateQRCode, qrController.createVisit);

// Ruta para validar un QR
router.post('/validate-qr', qrController.QRValidation);

export default router;