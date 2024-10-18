import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';

class NumpadMiddleware {
    generateNumericCode(req: Request, res: Response, next: NextFunction) {
        const { visitId } = req.body; //visitId es el key o campo que recibe el body en la consulta a la ruta

        if (!visitId) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'visitId es requerido' });
        }

        // Generar un código numérico de 6 dígitos
        const numericCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Agregar el código generado al cuerpo de la solicitud
        req.body.code = numericCode;
        next();  // Continuar hacia el controlador
    }
}

const numpadMiddleware = new NumpadMiddleware();
export default numpadMiddleware;
