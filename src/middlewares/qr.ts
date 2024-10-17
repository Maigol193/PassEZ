import QRCode from 'qrcode';
import { Request, Response, NextFunction } from 'express';

class QRMiddleware {
    generateQRCode(req: Request, res: Response, next: NextFunction) {
        const { visitId } = req.body;

        if (!visitId) {
            res.status(400).json({ message: 'visitId es requerido' });
        }

        // Genera el código QR
        QRCode.toDataURL(visitId)
            .then((qrData) => {
                // Agregar el código QR generado al cuerpo de la solicitud
                req.body.qrCode = qrData;
                next(); // Continuar hacia el controlador
            })
            .catch(() => {
                // Si ocurre un error, responde con un mensaje adecuado
                res.status(500).json({ message: 'Error al generar el código QR' });
            });
    }
}

const qrMiddleware = new QRMiddleware();
export default qrMiddleware;
