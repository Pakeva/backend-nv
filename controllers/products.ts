import {TypesRequest} from "../interfaces";
import {Response} from "express";
import {Product} from "../models";
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
        const products = await Product.find().populate('user', {name:1});
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

const getProduct = async (req:TypesRequest<ProductProps>,res:Response) => {
    const {id} = req.params;

    try {
        await connectDb();
        const product = await Product.findById(id).populate('category', {name: 1});
        await disconnectDb();

        if (!product) {
            return res.status(400).json({
                msg: 'Producto no encontrado'
            })
        }

        if (!product.status) {
            return res.status(400).json({
                msg: 'Producto actualmente eliminado'
            })
        }

        res.status(200).json({
            msg: 'Success',
            product,
        })

    } catch (e) {
        errorResponse(e, res)
    }
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

const updateProduct = async (req:TypesRequest<ProductProps>,res:Response) => {
    const {id} = req.params;
    const {name, description, ...prod} = req.body;

    await connectDb();
    const productDB = await Product.findOne({name})

    if (productDB) {
        return res.status(400).json({
            msg: 'Este producto ya esta registrado'
        })
    }

    try {
        const productUpdated = await Product.findByIdAndUpdate(id, {
            name,
            description: description && description,
            ...prod
        }, {new: true})
        await disconnectDb();

        res.status(200).json({
            msg: 'Success',
            productUpdated
        })
    } catch (e) {
        errorResponse(e, res)
    }
}

const deleteProduct = async (req:TypesRequest<ProductProps>,res:Response) => {
    const {id} = req.params;

    await connectDb();
    const productIsActive = await Product.findById(id);

    if (!productIsActive!.status) {
        return res.status(400).json({
            msg: 'Producto ya eliminado anteriormente'
        })
    }

    try {
        const productDeleted = await Product.findByIdAndUpdate(id, {
            status: false,
        }, {new: true})
        await disconnectDb();

        res.status(200).json({
            msg: 'Producto eliminado correctamente',
            product: {
                name: productDeleted!.name,
                status: productDeleted!.status
            }
        })
    } catch (e) {
        errorResponse(e, res)
    }
}


export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}