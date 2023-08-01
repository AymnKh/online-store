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

//@desc    Get subCategories
//@route   GET /api/vl/sub-categories
//@access  Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1;
  const limit = req.query.limit * 1;
  const skip = (page - 1) * limit;
  const subCategories = await subcategoryModel
    .find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res.status(200).json({ count: subCategories.length, page, subCategories });
});

//@desc    Get subCategory by id
//@route   GET /api/vl/sub-categories/:id
//@access  Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const subCategory = await subcategoryModel.findById(id).populate("category");
  if (!subCategory) {
    return next(
      new ApiErrors(`No sub category founded for this id :${id}`, 400)
    );
  }
  res.status(200).json({ subCategory });
});

//@desc    Update subCategory
//@route   PUT /api/vl/sub-categories/:id
//@access  Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const updatedSubCategory = await subcategoryModel.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name), category: category },
    { new: true }
  );
  if (!updatedSubCategory) {
    return next(
      new ApiErrors(`No sub category founded for this id :${id}`, 400)
    );
  }
  res.status(200).json({ updatedSubCategory });
});

//@desc    Delete sub category by id
//@route   DELETE /api/vl/sub-categories/:id
//@access  Private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await subcategoryModel.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new ApiErrors(`No category founded for this id :${id}`, 400));
  }
  res.status(200).json({ message: "Category deleted" });
});
