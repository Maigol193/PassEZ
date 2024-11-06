const { Schema, model, SchemaTypes } = require('mongoose');

const rfidSchema = new Schema({
    userId: { type: SchemaTypes.String},
    rfidTag: { type: SchemaTypes.String, required: true },
    createdAt: { type: SchemaTypes.Date, default: Date.now }
});

const rfid = model('rfid', rfidSchema);
export default rfid;