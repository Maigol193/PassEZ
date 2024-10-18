import QRCode from 'qrcode';
import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';

class QRMiddleware {
    generateQRCode(req: Request, res: Response, next: NextFunction) {
        const { visitId } = req.body; //visitId es el key o campo que recibe el body en la consulta a la ruta

        if (!visitId) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'visitId es requerido' });
        }

        // Genera el código QR
        QRCode.toDataURL(visitId)
            .then((qrData) => {
                // Agregar el código QR generado al cuerpo de la solicitud
                req.body.qrCode = qrData;
                next(); // Continuar hacia el controlador
            })
            .catch(() => {
                // Si ocurre un error, responde con un mensaje de error
                res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al generar el código QR' });
            });
    }
}

const qrMiddleware = new QRMiddleware();
export default qrMiddleware;
