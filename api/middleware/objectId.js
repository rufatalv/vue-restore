import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid Product ID",
      status: 400,
    });
  }

  next();
};
export default validateObjectId;
