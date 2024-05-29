import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  body: String,
  description: String,
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
  meta: {
    votes: {
      type: Number,
      default: 0,
    },
    favs: {
      type: Number,
      default: 0,
    },
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
