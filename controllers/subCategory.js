const subcategoryModel = require("../models/subCategory");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiErrors = require("../helpers/ApiErrors");

//@desc    Create subcategory
//@route   POST /api/vl/sub-categories
//@access  Private
exports.addSubCategory = asyncHandler(async (req, res) => {
  const name = req.body.name; //get name from body
  const category = req.body.category; //get category from body
  const newSubCategory = await subcategoryModel.create({
    name: name,
    category: category,
    slug: slugify(name),
  });
  res.status(201).json({ data: newSubCategory });
});
