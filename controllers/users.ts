import {Request, Response} from 'express'
import {errorResponse, hashPassword} from "../helpers";
import {User} from '../models'
import {connectDb, disconnectDb} from "../database/config";
import {disconnect} from "mongoose";
import {TypesRequest, UserProps} from "../interfaces";

const createUser = async (req: TypesRequest<UserProps>, res: Response) => {
    const {body} = req;

    const user = new User({...body})
    user.password = hashPassword(user.password);

    try {
        await connectDb();
        await user.save();
        await disconnect();
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
        await connectDb();
        const userUpdated = await User.findByIdAndUpdate(id, user, {new: true});
        await disconnectDb();

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
        await connectDb();
        const users = await User.find();
        await disconnectDb();
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
        await connectDb()
        const user = await User.findById(id);
        await disconnectDb();
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
        await connectDb();
        await User.findByIdAndUpdate(id, {status: false})
        await disconnectDb();
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