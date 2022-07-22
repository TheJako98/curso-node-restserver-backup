const { Schema, model } = require('mongoose');
const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre oligatorio']
    },
    correo: {
        type: String,
        required: [true, 'Correo oligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Contraseña oligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true, 
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {
    const {__v, _id, password, ...user} = this.toObject();
    user.uid= _id; 
    return user;
}

module.exports = model('Usuario', usuarioSchema);
