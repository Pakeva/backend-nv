import {TypesRequest, UserProps} from "../interfaces";
import {Response} from "express";
import {Category, Product} from "../models";

import {errorResponse} from "../helpers";

interface CategoryProps {
    name: string,
    description?: string,
    state?: boolean,
    user?: UserProps
}

const getCategories = async (req: TypesRequest<CategoryProps[]>, res: Response) => {
    try {

        const categories = await Category.find();


        const catFiltered = categories.filter(cat => cat.status);
        res.status(200).json({
            msg: 'Success',
            totalCategories: catFiltered.length,
            categories: catFiltered
        })
    } catch (e) {
        errorResponse(e, res)
    }
}

const getCategory = async (req: TypesRequest<CategoryProps>, res: Response) => {
    const {id} = req.params;

    try {

        const category = await Category.findById(id).populate('user', {name: 1, email: 1});


        if (!category) {
            return res.status(400).json({
                msg: 'Categoría no encontrada'
            })
        }

        if (!category.status) {
            return res.status(400).json({
                msg: 'Categoría actualmente eliminada'
            })
        }

        res.status(200).json({
            msg: 'Success',
            category,
        })

    } catch (e) {
        errorResponse(e, res)
    }
}

const createCategory = async (req: TypesRequest<CategoryProps>, res: Response) => {
    const {name, description} = req.body;

    const categoryDB = await Category.findOne({name: name.toUpperCase()})
    const amountCategories = await Category.find({status: true}).countDocuments();

    if (amountCategories >= 5) {
        return res.status(400).json({
            msg: 'No puedes tener más de 5 categorías'
        })
    }

    const newCategory = new Category({
        name: name.toUpperCase(),
        user: req.user?._id,
        description
    })

    if (categoryDB && categoryDB.status) {
        return res.status(400).json({
            msg: 'La categoría ya esta registrada'
        })
    }

    try {
        await newCategory.save();

        res.status(200).json({
            msg: 'Categoría creada correctamente',
            category: newCategory
        })
    } catch (e) {
        errorResponse(e, res)
    }

}

const updateCategory = async (req: TypesRequest<CategoryProps>, res: Response) => {
    const {id} = req.params;
    const {name, description, ...cat} = req.body;


    const categoryDB = await Category.findOne({name: name.toUpperCase()})

    if (categoryDB) {
        return res.status(400).json({
            msg: 'Esta categoría ya esta registrada'
        })
    }

    try {
        const categoryUpdated = await Category.findByIdAndUpdate(id, {
            name: name.toUpperCase(),
            description: description && description,
            ...cat
        }, {new: true})


        res.status(200).json({
            msg: 'Success',
            categoryUpdated
        })
    } catch (e) {
        errorResponse(e, res)
    }
}

const deleteCategory = async (req: TypesRequest<CategoryProps>, res: Response) => {
    const {id} = req.params;

    const categoryIsActive = await Category.findById(id);

    if (!categoryIsActive!.status) {
        return res.status(400).json({
            msg: 'Categoría ya eliminada anteriormente'
        })
    }


    try {
        const categoryDeleted = await Category.findByIdAndUpdate(id, {
            status: false,
        }, {new: true})
        await Product.remove({category: id});

        res.status(200).json({
            msg: 'Categoría eliminada correctamente',
            category: {
                name: categoryDeleted!.name,
                status: categoryDeleted!.status
            }
        })
    } catch (e) {
        errorResponse(e, res)
    }

}

export {
    createCategory,
    deleteCategory,
    getCategories,
    getCategory,
    updateCategory
}