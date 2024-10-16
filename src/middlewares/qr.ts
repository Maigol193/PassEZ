import { Request, Response, NextFunction } from 'express';
import QR from '../models/qr'; // Asegúrate de importar el modelo correcto

const validateQR = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const qrCode = req.body.qrCode; // Asegúrate de que el código QR esté en el cuerpo de la solicitud
        const isValid = await QR.findOne({ code: qrCode }); // Busca el código QR en la base de datos

        if (isValid) {
            next(); // Si es válido, continúa al siguiente middleware o controlador
        } else {
            res.status(400).json({ message: 'QR inválido' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error validando el QR' });
    }
};

export default validateQR;