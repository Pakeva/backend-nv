import {model, Schema} from "mongoose";


const RoleSchema = new Schema({
    rol: {
        type: String,
        required: [true, 'El rol es requerido']
    }
})


export default model('Role', RoleSchema);