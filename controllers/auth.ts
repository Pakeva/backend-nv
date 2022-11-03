import {Response} from "express";
import {LoginUserProps, TypesRequest} from "../interfaces";
import bcrypt from 'bcrypt';
import {User} from "../models";
import {UserProps} from '../interfaces'

import {generateJwt} from "../helpers";


const loginUser = async (req: TypesRequest<LoginUserProps>, res: Response) => {
    const {email, password} = req.body;



    let user = await User.findOne({email}) || {} as UserProps;


    if (!user.status) {
        return res.status(400).json({
            msg: 'Este usuario ha sido deshabilitado o eliminado'
        })
    }

    if (!password) {
        return res.status(400).json({
            msg: 'Es necesaria la contraseña'
        })
    }

    const comparePass = bcrypt.compareSync(password, user.password);
    if (!comparePass) {
        return res.status(400).json({
            msg: 'La contraseña no coincide'
        })
    }

    const token = await generateJwt(user._id!.toString())

    const {_id, rol, status, name, bondingCode} = user;
    return res.status(200).json({
        msg: 'Success login user',
        user: {
            id: _id,
            rol,
            status,
            name,
            bondingCode,
        },
        token
    })
}


export {
    loginUser
}