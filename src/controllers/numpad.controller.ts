import { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';
import Numpad from '../models/numpad';
import { Numpad as NumpadType } from "../types/numpad";

class NumpadControllers {
    // Crear una nueva entrada con código numérico
    createCode(req: Request, res: Response) {
        const { userId, code } = req.body;

        if (!userId || !code) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'userId y code son requeridos' });
            return;
        }

        const newNumpad = new Numpad({
            userId: userId,
            code: code,
        });

        newNumpad.save()
            .then(() => {
                res.status(HTTP_STATUS_CODES.CREATED).json({
                    message: 'Código numérico creado con éxito',
                    code: code // Aquí se incluye el código en la respuesta
                });
            })
            .catch(() => {
                res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al crear la entrada de código numérico' });
            });
    }

    // Validar un código numérico
    validateCode(req: Request, res: Response) {
        const { code } = req.body;

        if (!code) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'Código numérico es requerido' });
            return;
        }

        Numpad.findOne({ code }).then((numpad: NumpadType | null) => {
            if (!numpad) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Código numérico no válido o no encontrado' });
                return;
            }

            res.status(HTTP_STATUS_CODES.SUCCESS).json({ message: 'Código numérico válido, acceso permitido' });
        }).catch(() => {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al validar el código numérico' });
        });
    }
}

const controller = new NumpadControllers();
export default controller;
