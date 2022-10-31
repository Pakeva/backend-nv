import {Category, Product, Rol, User} from "../models";

import {disconnect} from "mongoose";
import {RolesTypes} from "../interfaces";
import {Logger} from "concurrently";

const isValidRol = async (rol: RolesTypes) => {
    let existsRol;
    try {

        existsRol = await Rol.findOne({rol});

    } catch (e) {
        console.log(e)
        throw new Error('Hable con el encargado para ver el problema')
    }

    if (!existsRol) {
        throw new Error('El rol no esta definido en la base de datos');
    }
}

const emailExists = async (email = '') => {
    let emailIsRegistered;
    try {

        emailIsRegistered = await User.findOne({email})

    } catch (e) {
        console.log(e)
        throw new Error('Hable con el encargado para ver el problema')
    }

    if (emailIsRegistered) {
        throw new Error('El email ya está registrado');
    }
}


const userExists = async (id = '') => {
    let userIsRegistered;
    try {

        userIsRegistered = await User.findById(id)

    } catch (e) {
        console.log(e)
        throw new Error('Hable con el encargado para ver el problema')
    }

    if (!userIsRegistered) {
        throw new Error('EL usuario no está registrado');
    }
}

const isUserActive = async (id = '') => {
    let user;
    try {

        user = await User.findById(id, {status: 1})

    } catch (e) {
        console.log(e)
        throw new Error('Hable con el encargado para ver el problema')
    }

    if (!user!.status) {
        throw new Error('EL usuario no está activo o ha ya sido eliminado');
    }
}

const searchUserByEmail = async (email = '') => {
    let existsEmail;
    try {
        existsEmail = await User.findOne({email});
    } catch (e:any) {
        throw new Error(e)
    }

    if (!existsEmail) {
        throw new Error('El email no esta registrado en la base de datos');
    }
}

const categoryExists = async(id='') => {
    let category;
    try {

        category = await Category.findOne({id})

    } catch (e:any) {
        throw new Error(e)
    }

    if(!category){
        throw new Error('La categoría no esta registrada en la base de datos');
    }
}

const productExists = async(id='') => {
    let product;
    try {

        product = await Product.findOne({id})

    } catch (e:any) {
        throw new Error(e)
    }

    if(!product){
        throw new Error('El producto no esta registrado en la base de datos');
    }
}

export {
    isValidRol,
    emailExists,
    userExists,
    isUserActive,
    searchUserByEmail,
    categoryExists,
    productExists
}