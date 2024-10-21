import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';

class RFIDMiddleware {
    generateRFIDTag(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.body; // userId es el key o campo que recibe el body en la consulta a la ruta

        if (!userId) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'userId es requerido' });
            return;
        }

        // Generar un tag RFID único
        const rfidTag = Math.random().toString(36).substring(2, 12);

        // Agregar el tag RFID generado al cuerpo de la solicitud
        req.body.rfidTag = rfidTag;
        next();  // Continuar hacia el controlador
    }
}

const rfidMiddleware = new RFIDMiddleware();
export default rfidMiddleware;