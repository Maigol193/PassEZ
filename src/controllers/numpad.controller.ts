import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

class NumpadControllers {
    handleNumpadValidation(req: Request, res: Response) {
        return res.status(HTTP_STATUS_CODES.SUCCESS).json({ message: 'Acceso permitido' });
    }
}

const controller = new NumpadControllers();
export default controller;
