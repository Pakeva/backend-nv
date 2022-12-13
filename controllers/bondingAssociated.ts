import {TypesRequest} from "../interfaces";
import {Response} from "express";
import {errorResponse} from "../helpers";
import BondingAssociated from "../models/bondingAssociated";
import {Product, User} from "../models";
import {loginUser} from "./auth";
import { Promise } from "mongoose";

interface BondingAssociatedProps {
    id?: string,
    associatedID: string
}

const addAssociatedToCompany = async (req: TypesRequest<BondingAssociatedProps>, res: Response) => {
    const {associatedID} = req.body
    const associated = await User.findById(associatedID);

    if (!associated) {
        return res.status(401).json({
            msg: 'El asociado fue eliminado o dado de baja'
        })
    }

    const existsBondingAssociated = await BondingAssociated.findOne({
        user: req.user?._id,
        associated: associatedID
    })

    if (existsBondingAssociated) {
        return res.status(401).json({
            msg: 'Ya esta vinculado este asociado'
        })
    }

    const newBondingAssociated = new BondingAssociated({
        user: req.user?._id,
        associated: associatedID
    })

    console.log(newBondingAssociated);
    try {
        await newBondingAssociated.save();

        res.status(201).json({
            msg: 'Vinculacion realizada con exito',
        })
    } catch (e) {
        errorResponse(e, res)
    }
}

const getBondingAssociatedToCompany = async (req: TypesRequest<BondingAssociatedProps>, res: Response) => {

    const bonding = await BondingAssociated.find({
        user: req.user?._id
    });

    if(bonding.length === 0){
        return res.status(200).json({
            msg: 'No cuentas con ningun asociado vinculado',
        })
    }

    let associates;

    try{

        associates = await Promise.all(bonding.map(el =>
            User.find({
                _id: el.associated
            })
        ))


        res.status(200).json({
            msg: 'success',
            associates: associates.flat()
        })

    } catch (e){
        errorResponse(e, res)
    }

}

const deleteBounding = async (req: TypesRequest<BondingAssociatedProps>, res: Response) => {
    //Todo fix this
    const {id} = req.params;

    const bonding = await BondingAssociated.find({
        user: req.user?._id,
        associated: id
    });

    await BondingAssociated.remove({category: id});


    res.status(200).json({
        msg: 'Asociado eliminado correctamente',
    })
}


export {
    addAssociatedToCompany,
    getBondingAssociatedToCompany,
    deleteBounding
}
