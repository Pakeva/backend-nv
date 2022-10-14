import {Response} from "express";

const errorResponse = (e:any, res: Response) => {
    console.log(e);
    return res.status(400).json({
        msg: 'ERROR - Contacta a soporte tecnico para seguimiento del error'
    })
}

export {
    errorResponse
}