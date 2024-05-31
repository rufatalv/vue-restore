import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  body: String,
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  price: Number,
  rating: {
    rate: Number,
    count: Number,
  },
  comments: [
    {
      body: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
