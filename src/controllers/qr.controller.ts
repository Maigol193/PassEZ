import { Request, Response } from 'express';
import QRCode from 'qrcode';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';
import QR from '../models/qr';
import { QR as QRType } from "../types/qr";

class QRControllers {
    // Crear una nueva entrada con QR sin necesidad de recibir datos en el cuerpo
    createVisit(req: Request, res: Response) {
        // Generar el código QR de forma automática
        const timestamp = new Date().getTime();
        const visitId = `visit_${timestamp.toString()}`;  // Ejemplo: generar un ID único basado en el tiempo o algún otro dato
        QRCode.toDataURL(visitId)
            .then((qrData) => {
                // Crear la nueva entrada QR en la base de datos con el código generado
                const newQR = new QR({
                    userId: visitId,  // Almacena el visitId generado
                    qrCode: qrData
                });

                // Guardar en la base de datos y responder al cliente
                newQR.save().then(() => {
                    res.status(HTTP_STATUS_CODES.CREATED).json({
                        message: 'QR creado con éxito',
                        qrCode: qrData // Devuelve el código QR generado
                    });
                }).catch(() => {
                    res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al crear la entrada QR' });
                });
            })
            .catch(() => {
                // Responde con un error si falla la generación del QR
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

        // Encontrar y eliminar el QR si existe
        QR.findOneAndDelete({ qrCode })
            .then((qr: QRType | null) => {
                if (!qr) {
                    res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'QR Code no válido o no encontrado' });
                    return;
                }

                res.status(HTTP_STATUS_CODES.SUCCESS).json({ message: 'QR Code válido, acceso permitido y eliminado' });
            })
            .catch(() => {
                res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al validar y eliminar el QR Code' });
            });
    }
}

const controller = new QRControllers();
export default controller;
