import {TypesRequest} from "../interfaces";
import {Response} from "express";


const getCategories = (req:TypesRequest<any>,res:Response) => {
    return res.status(200).json({
        msg: 'Success'
    })
}

const getCategory = (req:TypesRequest<any>,res:Response) => {
    return res.status(200).json({
        msg: 'Success'
    })
}

const createCategory = (req:TypesRequest<any>,res:Response) => {
    return res.status(200).json({
        msg: 'Success'
    })
}

const updateCategory = (req:TypesRequest<any>,res:Response) => {
    return res.status(200).json({
        msg: 'Success'
    })
}

const deleteCategory = (req:TypesRequest<any>,res:Response) => {
    return res.status(200).json({
        msg: 'Success'
    })
}

export {
    createCategory,
    deleteCategory,
    getCategories,
    getCategory,
    updateCategory
}