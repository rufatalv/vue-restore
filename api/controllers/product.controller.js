import Product from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Category from "../models/category.model.js";

const extractAndVerifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const email = decodedToken.user.email;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({message: 'User not found.'});
        }

        return {decodedToken, user};
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized.'});
    }
};


export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate('category');

        if (products.length > 0) {
            return res.status(200).json(products);
        } else {
            return res.status(404).json({
                message: "No Products Available",
                status: 404,
            });
        }
    } catch (error) {
        next(error);
    }
};
export const getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product
        .findById(req.params.id)
        .populate('category')

        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({
                message: "No Products Available",
                status: 404,
            });
        }
    } catch (error) {
        next(error);
    }
};


export const addProduct = async (req, res, next) => {
    try {
        const {title, body, description, category, price} = req.body;

        const existingProduct = await Product.findOne({title: title});
        if (existingProduct) {
            return res.status(200).json({
                message: "Product Already Exists",
                status: 200,
            });
        }

        const uploadedFile = req.file;
        if (!uploadedFile) {
            return res.status(400).json({
                message: "Please upload an image",
                status: 400,
            });
        }

        const token = req.headers.authorization.split(' ')[1];
        // eslint-disable-next-line no-undef
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const author = decodedToken.username;

        const result = await cloudinary.uploader.upload(uploadedFile.path);

        const newProduct = new Product({
            title,
            body,
            author,
            description,
            image: result.secure_url,
            category: category,
            price: +price,
        });

        await newProduct.save();
        // todo new filter
        // const updatedCategory = await Category.findByIdAndUpdate(category, {
        //     $push: { products: newProduct._id }
        // }, { new: true });

        // await updatedCategory.save();

        res.send("Product added successfully");
    } catch (error) {
        next(error);
    }
};
export const addProductToLikes = async (req, res, next) => {
    try {
        const {decodedToken, user} = await extractAndVerifyToken(req, res);

        if (decodedToken && user) {
            const {productId} = req.params;
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({message: 'Product not found.'});
            }

            if (user.likedProducts.includes(productId)) {
                return res.status(400).json({message: 'Product already liked.'});
            }

            user.likedProducts.push(productId);
            await user.save();

            await user.populate('likedProducts');

            res.status(200).json({message: 'Product added to likes successfully.', likedProducts: user.likedProducts});
        } else {
            return res.status(401).json({message: 'Unauthorized.'});
        }
    } catch (error) {
        next(error);
    }
};

export const deleteProductFromLikes = async (req, res, next) => {
    try {
        const {decodedToken, user} = await extractAndVerifyToken(req, res);

        if (decodedToken && user) {
            const {productId} = req.params;

            if (!user.likedProducts.includes(productId)) {
                return res.status(400).json({message: 'Product not liked by user.'});
            }

            user.likedProducts = user.likedProducts.filter(id => id.toString() !== productId);
            await user.save();

            res.status(200).json({
                message: 'Product removed from likes successfully.',
                likedProducts: user.likedProducts
            });
        } else {
            return res.status(401).json({message: 'Unauthorized.'});
        }
    } catch (error) {
        next(error);
    }
};
export const deleteProduct = async (req, res, next) => {
    const productId = req.params.id;
    console.log(productId);
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        console.error(error);
        next(error);
    }
};
