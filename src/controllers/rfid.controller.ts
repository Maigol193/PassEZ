import { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';
import rfid from '../models/rfid';
import { RFID as RFIDType } from "../types/rfid";

class rfidController {
    // Crear nueva entrada con código RFID
    createRFID(req: Request, res: Response) {
        // const { userId, uid } = req.body;

        // if (!userId || !uid) {
        //     res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'userId y uid son requeridos' });
        //     return;
        // }

        // Generar un tag RFID único
        const rfidTag = Math.random().toString(36).substring(2, 12);

        // Crear una nueva entrada en la base de datos
        const newRFID = new rfid({
            rfidTag: rfidTag
        });

        newRFID.save().then(() => {
            res.status(HTTP_STATUS_CODES.CREATED).json({ message: 'Código RFID creado con éxito', rfidTag });
        }).catch(() => {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al guardar en la base de datos' });
        });
    }

    // Validar un código RFID
    validateRFID(req: Request, res: Response) {
        const { rfidTag } = req.body;

        if (!rfidTag) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'Código RFID son requeridos' });
            return;
        }

        rfid.findOne({ rfidTag }).then((rfidEntry: RFIDType | null) => {
            if (!rfidEntry) {
                return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Código RFID no válido o no encontrado' });
            }

            res.status(HTTP_STATUS_CODES.SUCCESS).json({
                message: 'Código RFID, acceso permitido'
            });
        }).catch(() => {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al validar el código RFID' });
        });
    }
}

const controller = new rfidController();
export default controller;