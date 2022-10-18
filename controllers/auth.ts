import {Response} from "express";
import {LoginUserProps, TypesRequest} from "../interfaces";
import bcrypt from 'bcrypt';
import {User} from "../models";
import {UserProps} from '../interfaces'
import {connectDb, disconnectDb} from "../database/config";
import {generateJwt} from "../helpers";


const loginUser = async (req: TypesRequest<LoginUserProps>, res: Response) => {
    const {email, password} = req.body;


    await connectDb();
    let user = await User.findOne({email}) || {} as UserProps;
    await disconnectDb();


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
    if(!comparePass){
        return res.status(400).json({
            msg: 'Las contraseñas no coinciden'
        })
    }

    const token = await generateJwt(user._id!.toString())

    return res.status(200).json({
        msg: 'Success login user',
        token
    })
}


export {
    loginUser
}