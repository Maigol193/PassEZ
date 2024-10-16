import QRCode from 'qrcode';
import QRModel from '../models/qr';

export const createQR = async (userId: string) => {
    const qrCode = await QRCode.toDataURL(userId);
    const newQR = new QRModel({ userId, qrCode });
    await newQR.save();
    return qrCode;
};

export const validateQR = async (qrCode: string) => {
    const qr = await QRModel.findOne({ qrCode });
    return qr ? true : false;
};