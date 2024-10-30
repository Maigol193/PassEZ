const { Schema, model, SchemaTypes } = require('mongoose');

const numpadSchema = new Schema({
    userId: { type: SchemaTypes.String, required: true },
    code: { type: SchemaTypes.String, required: true },  // Código numérico de 6 dígitos
});

const numpad = model('numpad', numpadSchema);
export default numpad;
