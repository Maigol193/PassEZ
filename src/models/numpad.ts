const { Schema, model, SchemaTypes } = require('mongoose');

const numpadSchema = new Schema({
    userId: { type: SchemaTypes.String, required: true },
    code: { type: SchemaTypes.String, required: true },  // Código numérico de 6 dígitos
    createdAt: { type: SchemaTypes.Date, default: Date.now, expires: '1h' }  // El código expira en 1 hora
});

const numpad = model('numpad', numpadSchema);
export default numpad;
