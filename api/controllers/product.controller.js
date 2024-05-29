import Product from "../models/product.model.js";

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
    const { title, body, author, meta, comments, hidden, date, description } =
      req.body;
    const existingProduct = await Product.findOne({ title: title });
    if (existingProduct) {
      return res.status(200).json({
        message: "Product Already Exists",
        status: 200,
      });
    }
    const newProduct = new Product({
      title,
      body,
      author,
      meta,
      comments,
      hidden,
      date,
      description,
    });
    await newProduct.save();
    res.send("Product added successfully");
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
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
