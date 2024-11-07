import { Request, Response } from 'express';
import QRCode from 'qrcode';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';
import QR from '../models/qr';
import { QR as QRType } from "../types/qr";

class QRControllers {
    // Crear una nueva entrada con QR, almacenando solo el visitId
    createVisit(req: Request, res: Response) {
        const timestamp = new Date().getTime();
        const visitId = `visit_${timestamp.toString()}`;  // Generar un ID único basado en el tiempo

        // Generar el código QR a partir del visitId
        QRCode.toDataURL(visitId)
            .then((qrData) => {
                // Crear la nueva entrada en la base de datos con solo el visitId
                const newQR = new QR({
                    userId: visitId,
                    qrCode: visitId // Almacena el visitId, no el Base64
                });

                newQR.save().then(() => {
                    res.status(HTTP_STATUS_CODES.CREATED).json({
                        message: 'QR creado con éxito',
                        qrCode: qrData // Envía el código QR como una imagen en Base64 para el cliente
                    });
                }).catch(() => {
                    res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al crear la entrada QR' });
                });
            })
            .catch(() => {
                res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al generar el código QR' });
            });
    }

    // Validar y eliminar un QR Code
    QRValidation(req: Request, res: Response) {
        const { qrCode } = req.body;

        if (!qrCode) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'QR Code es requerido' });
            return;
        }

        // Buscar y eliminar el QR si existe usando solo el visitId
        QR.findOne({ qrCode })
            .then((qr: QRType | null) => {
                if (!qr) {
                    res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'QR Code no válido o no encontrado' });
                    return;
                }

                res.status(HTTP_STATUS_CODES.SUCCESS).json({ message: 'QR Code válido, acceso permitido' });
            })
            .catch(() => {
                res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al validar el QR Code' });
            });
    }
}

const controller = new QRControllers();
export default controller;
