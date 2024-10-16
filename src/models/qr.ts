const { Schema, model, SchemaTypes } = require('mongoose');

const qrSchema = new Schema({
    userId: { type: SchemaTypes.String, required: true },
    qrCode: { type: SchemaTypes.String, required: true },
    createdAt: { type: SchemaTypes.Date, default: Date.now, expires: '1h' } // El código expira en 1 hora
});
const qr = model('qr', qrSchema);
export default qr;