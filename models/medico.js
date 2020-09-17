const { Schema, model} = require('mongoose');


const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
})

MedicoSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();
    return object;
})

module.exports = model('Medico', MedicoSchema);