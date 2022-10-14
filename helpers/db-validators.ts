import {Rol, User} from "../models";
import {connectDb, disconnectDb} from "../database/config";
import {disconnect} from "mongoose";
import {RolesTypes} from "../interfaces";
import {Logger} from "concurrently";

const isValidRol = async (rol: RolesTypes) => {
    let existsRol;
    try {
        await connectDb();
        existsRol = await Rol.findOne({rol});
        await disconnectDb();
    } catch (e) {
        console.log(e)
        throw new Error('Hable con el encargado para ver el problema')
    }

    if(!existsRol){
        throw new Error('El rol no esta definido en la base de datos');
    }
}

const emailExists = async (email = '') => {
    let emailIsRegistered;
    try {
        await connectDb();
        emailIsRegistered = await User.findOne({email})
        await disconnect();
    } catch (e) {
        console.log(e)
        throw new Error('Hable con el encargado para ver el problema')
    }

    if(emailIsRegistered){
        throw new Error('El email ya está registrado');
    }
}


const userExists = async (id = '') => {
    let userIsRegistered;
    try {
        await connectDb();
        userIsRegistered = await User.findById(id)
        await disconnectDb();
    } catch (e) {
        console.log(e)
        throw new Error('Hable con el encargado para ver el problema')
    }

    if(!userIsRegistered){
        throw new Error('EL usuario no está registrado');
    }
}

const isUserActive = async (id='') => {
    let user;
    try {
        await connectDb();
        user = await User.findById(id, {status: 1})
        console.log(user)
        await disconnectDb();
    } catch (e) {
        console.log(e)
        throw new Error('Hable con el encargado para ver el problema')
    }

    if(!user!.status){
        throw new Error('EL usuario no está activo o ha ya sido eliminado');
    }
}

export {
    isValidRol,
    emailExists,
    userExists,
    isUserActive
}