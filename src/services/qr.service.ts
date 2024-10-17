import QRCode from 'qrcode';
import { Request, Response, NextFunction } from 'express';

// Middleware para generar código QR
const generateQRCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { visitId } = req.body; // Recibirás el visitId o algún dato relevante del visitante
        
        if (!visitId) {
            return res.status(400).json({ message: 'visitId is required' });
        }

        // Generar el QR code en formato de URL
        const qrData = await QRCode.toDataURL(visitId);

        // Aquí puedes añadir el QR generado a `req` para pasarlo a un controlador
        req.body.qrCode = qrData;

        next(); // Continuar al siguiente middleware o controlador
    } catch (error) {
        res.status(500).json({ message: 'Error generating QR code', error });
    }
};

export default generateQRCode;