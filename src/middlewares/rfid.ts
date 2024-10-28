import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';

class RFIDMiddleware {
    generateRFIDTag(req: Request, res: Response, next: NextFunction) {
        const { userId, uid } = req.body; // userId y uid son los campos que recibe el body en la consulta a la ruta

        if (!userId || !uid) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'userId y uid son requeridos' });
            return;
        }

        // Generar un tag RFID único
        const rfidTag = Math.random().toString(36).substring(2, 12);

        // Agregar el tag RFID generado y el uid al cuerpo de la solicitud
        req.body.rfidTag = rfidTag;
        req.body.uid = uid; // uid es el valor de la tarjeta para asociar la entrada con una tarjeta
        next();  // Continuar hacia el controlador
    }
}

const rfidMiddleware = new RFIDMiddleware();
export default rfidMiddleware;