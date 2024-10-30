import { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';
import rfid from '../models/rfid';
import { RFID as RFIDType } from "../types/rfid";

class rfidController{
    // Crear nueva entrada con código RFID
    createRFID(req: Request, res: Response) {
        const { userId, rfidTag } = req.body;

        if (!userId || !rfidTag) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'userId y rfidTag son requeridos' });
            return;
        }

        const newRFID = new rfid({
            userId: userId,
            rfidTag: rfidTag,
        });

        newRFID.save().then(() => {
            res.status(HTTP_STATUS_CODES.CREATED).json({ message: 'Código RFID creado con éxito' });
        }).catch(() => {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al crear la entrada de código RFID' });
        });
    }

    //Validar un código RFID
    validateRFID(req: Request, res: Response) {
        const { rfidTag, userId } = req.body;

        if (!rfidTag || !userId) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'Código RFID y userId son requeridos' });
            return;
        }

        rfid.findOne({ rfidTag, userId }).then((rfidEntry: RFIDType | null) => {
            if (!rfidEntry) {
                return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Código RFID o userId no válido o no encontrado' });
            }

            const currentTime = new Date();
            if (currentTime > rfidEntry.createdAt) {
                return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Código RFID ha expirado' });
            }

            res.status(HTTP_STATUS_CODES.SUCCESS).json({
                message: 'Código RFID y userId válidos, acceso permitido',
                userId: rfidEntry.userId // Incluyendo userId en la respuesta
            });
        }).catch(() => {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al validar el código RFID' });
        });
    }   
}

const controller = new rfidController();
export default controller;