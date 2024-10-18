import { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';
import QR from '../models/qr';
import { QR as QRType } from "../types/qr";

class QRControllers {
    // Crear una nueva entrada con QR
    createVisit(req: Request, res: Response) {
        const { userId, qrCode } = req.body; //userId y qrCode son los campos que recibe el body en la consulta a la ruta

        if (!userId || !qrCode) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'userId y qrCode son requeridos' });
            return; // Termina la ejecución aquí
        }

        const newQR = new QR({
            userId: userId,
            qrCode: qrCode,
        });

        newQR.save().then(() => {
            res.status(HTTP_STATUS_CODES.CREATED).json({ message: 'QR creado con éxito' });
        }).catch(() => {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al crear la entrada QR' });
        });
    }

    // Validar un QR Code
    QRValidation(req: Request, res: Response) {
        const { qrCode } = req.body;

        if (!qrCode) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'QR Code es requerido' });
            return; // Termina la ejecución aquí
        }

        QR.findOne({ qrCode }).then((qr: QRType | null) => {  // 'qr' puede ser del tipo QRType o null
            if (!qr) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'QR Code no válido o no encontrado' });
                return; // Termina la ejecución aquí
            }

            res.status(HTTP_STATUS_CODES.SUCCESS).json({ message: 'QR Code válido, acceso permitido' });
        }).catch(() => {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al validar el QR Code' });
        });
    }
}

const controller = new QRControllers();
export default controller;
