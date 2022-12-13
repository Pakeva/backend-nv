import {Schema, model} from 'mongoose'

const UserSchema = new Schema({
    rol: {
        type: String,
        enum: ['SUPER_ADMIN', 'CLIENT', 'ASSOCIATED', 'FINAL_USER'],
        required: true
    },
    name: {
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    firstLastName: {
        type: String,
        required: [true, 'El apellido paterno es requerido'],
    },
    secondLastName: {
        type: String,
    },
    birthday: {
        type: Date,
        required: [true, 'La fecha de nacimiento es requerida']
    },
    genre: {
        type: String,
        enum: ['M', 'F', 'NB'],
        required: [true, 'El género paterno es requerido'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    email: {
        type: String,
        required: [true, 'El email paterno es requerido'],
    },
    zip:{
        type: Number,
        required: [true, 'El código postal es requerido'],
    },
    state:{
        type: String,
        required: [true, 'El estado es requerido'],
    },
    municipality:{
        type: String,
        required: [true, 'El municipio es requerido'],
    },
    colony: {
        type: String,
        required: [true, 'La colonia o fraccionamiento es requerido'],
    },
    street: {
        type: String,
        required: [true, 'La calle es requerida'],
    },
    numExt: {
        type: String,
        required: [true, 'La número exterior es requerido'],
    },
    numInt: {
        type: String,
    },
    references: {
        type: String,
    },
    phone: {
        type: Number,
        required: [true, 'El teléfono es requerido'],
    },
    status:{
        type: Boolean,
        default: true,
        required: true
    },
    bondingCode:{
        type: String,
        required: true
    },
    associatedBonding: {
        type: String,
    },
    associatedCompany: {
        type: String,
    },

})

UserSchema.methods.toJSON = function(){
    const {__v ,_id, state, password,...user } = this.toObject();
    // return category;

    //You know what it means
    return {id:_id,...user};
}


export default model('User', UserSchema);
