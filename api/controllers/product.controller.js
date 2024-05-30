import Product from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();

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
        const product = await Product.findById(req.params.id);

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
            category,
            price: +price,
        });

        await newProduct.save();
        res.send("Product added successfully");
    } catch (error) {
        next(error);
    }
};
export const addProductToLikes = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const email = decodedToken.user.email;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const { productId } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        if (user.likedProducts.includes(productId)) {
            return res.status(400).json({ message: 'Product already liked.' });
        }

        user.likedProducts.push(productId);
        await user.save();

        await user.populate('likedProducts')

        res.status(200).json({ message: 'Product added to likes successfully.', likedProducts: user.likedProducts });
    } catch (error) {
        next(error);
    }
}
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
