import {Response} from "express";
import {TypesRequest} from "../interfaces";
import {Shipping} from "../models";
import {errorResponse} from "../helpers";


const createShipping = async (req:TypesRequest<any>,res:Response) => {
    //TODO ALL VALIDATIONS
    const body = req.body;

    const newShipping = new Shipping({
        ...body
    })

    newShipping.user = req.user?._id

    try {
        await newShipping.save();

        res.status(200).json({
            msg: 'Envio guardado correctamente',
            envio: newShipping
        })
    } catch (e) {
        errorResponse(e, res)
    }
}

const getShippings = async (req:TypesRequest<any>,res:Response) => {
    //TODO ALL VALIDATIONS

    const shippings = await Shipping.find({
        user: req.user?._id
    })

    res.status(200).json({
        msg: 'fierro',
        envios: shippings
    })
}


export {
    createShipping,
    getShippings
}