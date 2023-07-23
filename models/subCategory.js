const mongoose = require("mongoose"); // Erase if already required

var subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short sub category name"],
      maxlength: [32, "Too long sub category name "],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Sub Category must belong to category"],
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("SubCategory", subCategorySchema);
