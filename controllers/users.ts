import {Request, Response} from 'express'
import {errorResponse, hashPassword} from "../helpers";
import {User} from '../models'
import randomString from 'randomstring';

import {TypesRequest, UserProps} from "../interfaces";

const createUser = async (req: TypesRequest<UserProps>, res: Response) => {
    const {body} = req;

    const user = new User({...body})
    user.password = hashPassword(user.password);
    user.bondingCode = randomString.generate(5);

    try {

        await user.save();

        res.status(201).json({
            msg: 'Usuario creado correctamente',
            user
        })
    } catch (e) {
        errorResponse(e, res);
    }
}

const updateUser = async (req: TypesRequest<UserProps>, res: Response) => {
    const {id} = req.params;
    const {email,rol, ...user} = req.body;

    if(user.password){
        user.password = hashPassword(user.password);
    }

    try {

        const userUpdated = await User.findByIdAndUpdate(id, user, {new: true});


        res.status(200).json({
            msg: 'Usuario actualizado correctamente',
            user: {
                ...user,
                password: ''
            }
        })
    } catch (e) {
        errorResponse(e, res)
    }
}

const getUsers = async (req: Request, res: Response) => {
    //HANDLE QUERYS - Page & Limit depend business rules;

    try {

        const users = await User.find();

        res.status(200).json({
            msg: 'success',
            users
        })
    } catch (e) {
        errorResponse(e, res);
    }
}

const getUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                msg: 'El usuario no está registrado'
            })
        }

        res.status(200).json({
            user
        })
    } catch (e) {
        errorResponse(e, res)
    }

}

const deleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {

        await User.findByIdAndUpdate(id, {status: false})

        res.status(200).json({
            msg: 'El usuario ha sido eliminado'
        })
    } catch (e) {
        errorResponse(e, res)
    }
}

export {
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser
}