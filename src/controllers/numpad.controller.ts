import { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';
import Numpad from '../models/numpad';
import { Numpad as NumpadType } from "../types/numpad";

class NumpadControllers {
    // Crear una nueva entrada con código numérico
    createCode(req: Request, res: Response) {
        // Generar un código numérico de 6 dígitos
        const numericCode = Math.floor(100000 + Math.random() * 900000).toString();

        const timestamp = new Date().getTime();
        const visitId = `visit_${timestamp.toString()}`;
        // Crear el nuevo código en la base de datos
        const newNumpad = new Numpad({
            userId: visitId,  // Generar un ID temporal o personalizado para la entrada
            code: numericCode,
        });

        newNumpad.save()
            .then(() => {
                res.status(HTTP_STATUS_CODES.CREATED).json({
                    message: 'Código numérico creado con éxito',
                    code: numericCode  // Devuelve el código generado en la respuesta
                });
            })
            .catch(() => {
                res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al crear la entrada de código numérico' });
            });
    }

    // Validar y eliminar un código numérico
    validateCode(req: Request, res: Response) {
        const { code } = req.body;

        if (!code) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'Código numérico es requerido' });
            return;
        }

        // Buscar y eliminar el código si existe
        Numpad.findOneAndDelete({ code }).then((numpad: NumpadType | null) => {
            if (!numpad) {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Código numérico no válido o no encontrado' });
                return;
            }

            res.status(HTTP_STATUS_CODES.SUCCESS).json({ message: 'Código numérico válido, acceso permitido y eliminado' });
        }).catch(() => {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({ message: 'Error al validar y eliminar el código numérico' });
        });
    }
}

const controller = new NumpadControllers();
export default controller;
