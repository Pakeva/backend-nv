import {TypesRequest, UserProps} from "../interfaces";
import {Response} from "express";
import {Category} from "../models";
import {connectDb, disconnectDb} from "../database/config";
import {errorResponse} from "../helpers";

interface CategoryProps {
    name: string,
    description?: string,
    state?: boolean,
    user?: UserProps
}

const getCategories = async (req: TypesRequest<CategoryProps[]>, res: Response) => {
    try {
        await connectDb();
        const categories = await Category.find();
        await disconnectDb();

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
        await connectDb();
        const category = await Category.findById(id).populate('user', {name: 1, email: 1});
        await disconnectDb();

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
    await connectDb();
    const categoryDB = await Category.findOne({name: name.toUpperCase()})

    if (categoryDB) {
        return res.status(400).json({
            msg: 'La categoría ya esta registrada'
        })
    }

    const newCategory = new Category({
        name: name.toUpperCase(),
        user: req.user?._id,
        description
    })

    try {
        await newCategory.save();
        await disconnectDb();
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

    await connectDb();
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
        await disconnectDb();

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
    await connectDb();
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
        await disconnectDb();

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