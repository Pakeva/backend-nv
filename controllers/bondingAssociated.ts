import {TypesRequest} from "../interfaces";
import {Response} from "express";
import {errorResponse} from "../helpers";
import BondingAssociated from "../models/bondingAssociated";
import {Product, User} from "../models";
import {loginUser} from "./auth";

interface BondingAssociatedProps {
    id?: string,
    associatedID: string
}

const addAssociatedToCompany = async (req:TypesRequest<BondingAssociatedProps>,res:Response) => {
    const {associatedID} = req.body

    const associated = await User.findById(associatedID);

    if(!associated){
        return res.status(401).json({
            msg: 'El asociado fue eliminado o dado de baja'
        })
    }

    const existsBondingAssociated = await BondingAssociated.findOne({
        user: req.user?._id,
        associated: associatedID
    })

    if(existsBondingAssociated){
        return res.status(401).json({
            msg: 'Ya esta vinculado este asociado'
        })
    }

    const newBondingAssociated = new BondingAssociated({
        user: req.user?._id,
        associated: associatedID
    })

    //TODO VALIDATION ASSOCIATED ROL TO BONDING
    try {
        await newBondingAssociated.save();

        res.status(201).json({
            msg: 'Vinculacion realizada con exito',
        })
    } catch (e) {
        errorResponse(e, res)
    }
}

const getBondingAssociatedToCompany = async (req:TypesRequest<BondingAssociatedProps>,res:Response) => {
    const bonding = await BondingAssociated.find({
        user: req.user?._id
    });

    //TODO GET ALL THE ASSOCIATEDS
    // const idAssociateds = bonding.map(bond => bond.associated);

    const associated = await User.findById(bonding[0].associated)


    res.status(200).json({
        msg: 'Success',
        //GET ALL ASOCIATEDs
        associateds: associated
    })
}


export {
   addAssociatedToCompany,
    getBondingAssociatedToCompany
}