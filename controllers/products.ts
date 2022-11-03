import {TypesRequest} from "../interfaces";
import {Response} from "express";
import {Product} from "../models";

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

const getProductsByCategoryId = async(req:TypesRequest<ProductProps[]>,res:Response) => {
    const {catId} = req.params;

    try {
        const products = await Product.find({
            category: catId
        }).populate('user', {name:1});

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

        const product = await Product.findById(id).populate('category', {name: 1});


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


    const productDb = await Product.findOne({name});

    if(productDb && productDb.status){
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


    const productDB = await Product.findOne({name})

    //TODO verify if the product name is already in the database
    // if (productDB && productDB.status) {
    //     return res.status(400).json({
    //         msg: 'Este producto ya esta registrado'
    //     })
    // }

    try {
        const productUpdated = await Product.findByIdAndUpdate(id, {
            name,
            description: description && description,
            ...prod
        }, {new: true})


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
    getProductsByCategoryId,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}