import Category from "../models/category.model.js";

export const getAllCategories = async (req, res, next) => {
    const categories = await Category.find().populate("products")

    if (categories.length > 0) {
        return res.status(200).json(categories);
    } else {
        return res.status(404).json({
            message: "No Categories Available",
            status: 404,
        });
    }
}

export const createCategory = async (req, res, next) => {
    const {name, description} = req.body;

    const existingCategory = await Category.findOne({name: name});

    if (existingCategory) {
        return res.status(200).json({
            message: "Category Already Exists",
            status: 200,
        });
    }

    const newCategory = new Category({name, description});

    try {
        await newCategory.save();
        res.status(201).json("Category created successfully!");
    } catch (error) {
        next(error);
    }
}

export const editCategory = async (req, res, next) => {
    try {
    //
    } catch (error) {
        next(error);
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json("Category deleted successfully!");
    } catch (error) {
        next(error);
    }
}