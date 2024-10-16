import { Request, Response, NextFunction } from 'express';
import Numpad from '../models/numpad'; // Asegúrate de importar el modelo correcto

const validateNumpad = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const code = req.body.code; // Asegúrate de que el código numérico esté en el cuerpo de la solicitud
        const isValid = await Numpad.findOne({ code: code }); // Busca el código en la base de datos

        if (isValid) {
            next(); // Si es válido, continúa al siguiente middleware o controlador
        } else {
            res.status(400).json({ message: 'Código numérico inválido' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error validando el código numérico' });
    }
};

export default validateNumpad;
