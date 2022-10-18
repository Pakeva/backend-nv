import {User} from "../models";
import jwt from 'jsonwebtoken'
import {Response} from "express";
import {Next, TypesRequest, UserProps} from "../interfaces";
import {connectDb, disconnectDb} from "../database/config";

const secretKey = 'Thisishtesecretkey,mustbeencrypted'

const validateJwt = async (req:TypesRequest<UserProps>,res:Response,next:Next) => {
    const token = req.header('token');
    if(!token){
        return res.status(401).json({
            msg: 'No token in the petition'
        })
    }

    try {
        // @ts-ignore
        const {uid} = jwt.verify(token,process.env.SECRETKEY || secretKey);
        req.header = uid;

        //Get the user own of the uid
        await connectDb();
        const user = await User.findById(uid);
        await disconnectDb();

        //Verify if the user exists
        if(!user){
            return res.status(401).json({
                msg: 'Token not valid - user not in DB'
            })
        }

        //Verify is the uid is state true
        if(!user.state){
            return res.status(401).json({
                msg: 'Token not valid - user with status false'
            })
        }

        // @ts-ignore
        req.user = user;
        next();
    } catch (e) {
        console.log(e)
        res.status(401).json({
            msg: 'Token not valid'
        })
    }

}


export {
    validateJwt
}