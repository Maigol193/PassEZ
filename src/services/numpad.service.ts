import numpadModel from '../models/numpad';

export const createCode = async (userId: string) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // Genera código de 6 dígitos
    const newCode = new numpadModel({ userId, code });
    await newCode.save();
    return code;
};

export const validateCode = async (code: string) => {
    const validCode = await numpadModel.findOne({ code });
    return validCode ? true : false;
};
