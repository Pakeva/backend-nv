import {TypesRequest} from "../interfaces";
import {Response} from "express";
import {Category, Product} from "../models";
import {connectDb, disconnectDb} from "../database/config";
import {errorResponse} from "../helpers";


interface ProductProps {
    name: string,
    description?: string,
    price: number,
    amount?: number,
    available: boolean,
    status?: boolean,
    category?: string,
    user?: string,
}

const getProducts = async(req:TypesRequest<ProductProps[]>,res:Response) => {
    try {
        await connectDb();
        const products = await Product.find();
        await disconnectDb();

        const prodFiltered = products.filter(prod => prod.status);
        res.status(200).json({
            msg: 'Success',
            totalProducts: prodFiltered.length,
            products: prodFiltered
        })
    } catch (e) {
        errorResponse(e, res)
    }
}

const getProduct = (req:TypesRequest<ProductProps>,res:Response) => {
    res.status(200).json({
        msg: 'Success products'
    })
}

const createProduct = async (req:TypesRequest<ProductProps>,res:Response) => {
    const {name, ...product} = req.body;

    await connectDb();
    const productDb = await Product.findOne({name});

    if(productDb){
        return res.status(400).json({
            msg: 'Este producto ya está registrado'
        })
    }

    const newProduct = new Product({
        name,
        ...product,
        user: req.user?._id
    })


    try {
        await newProduct.save();
        await disconnectDb();

        res.status(201).json({
            msg: 'Producto creado con éxito',
            product: newProduct
        })

    } catch (e) {
        errorResponse(e, res)
    }
}

const updateProduct = (req:TypesRequest<ProductProps>,res:Response) => {
    res.status(200).json({
        msg: 'Success products'
    })
}

const deleteProduct = (req:TypesRequest<ProductProps>,res:Response) => {
    res.status(200).json({
        msg: 'Success products'
    })
}


export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}