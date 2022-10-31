import {Next, TypesRequest, UserProps} from "../interfaces";
import {Response} from "express";

const isAdminRol = async (req: TypesRequest<UserProps>, res: Response, next: Next) => {
    if(!req.user){
        return res.status(500).json({
            msg:'Se necesita JWT'
        })
    }

    const {rol} = req.user;
    if(rol !== 'SUPER_ADMIN'){
        return res.status(400).json({
            msg: 'Esta acción necesita ser realizada por un SUPER ADMIN'
        })
    }1

    next();
}

const hasRol = (...roles: string[]) => {
    return async (req: TypesRequest<UserProps>, res: Response, next: Next) => {
        //Validations) => {
        if(!req.user){
            return res.status(500).json({
                msg:'The role verification is without token'
            })
        }

        if(!roles.includes(req.user.rol)){
            return res.status(500).json({
                msg:'The role is not valid'
            })
        }

        next();
    }
}

export {
    isAdminRol,
    hasRol
}