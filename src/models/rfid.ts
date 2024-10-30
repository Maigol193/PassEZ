const { Schema, model, SchemaTypes } = require('mongoose');

const rfidSchema = new Schema({
    userId: { type: SchemaTypes.String, required: true },
    rfidTag: { type: SchemaTypes.String, required: true },
    createdAt: { type: SchemaTypes.Date, default: Date.now } // La etiqueta RFID expira en 1 hora
});

const rfid = model('rfid', rfidSchema);
export default rfid;