const categoryModel = require("../models/category");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

//@desc    Create category
//@route   POST /api/vl/categorie
//@access  Private
exports.addCategory = asyncHandler(async (req, res) => {
  const name = req.body.name; //get name from body
  const newCategory = await categoryModel.create({
    name: name,
    slug: slugify(name),
  });
  res.status(201).json({ data: newCategory });
});

//@desc    Get categories
//@route   GET /api/vl/categorie
//@access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1;
  const limit = req.query.limit * 1;
  const skip = (page - 1) * limit;
  const categories = await categoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ count: categories.length, page, categories });
});

//@desc    Get category by id
//@route   GET /api/vl/categorie/:id
//@access  Public
exports.getCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await categoryModel.findById(id);
  if (!category) {
    res.status(400).json({ message: "No category found for this id" });
  }
  res.status(200).json({ category });
});

//@desc    Update category
//@route   PUT /api/vl/categorie/:id
//@access  Private
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedCategory = await categoryModel.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  if (!updatedCategory) {
    res.status(400).json({ message: "No category found for this id" });
  }
  res.status(200).json({ updatedCategory });
});

//@desc    Delete category by id
//@route   DELETE /api/vl/categorie/:id
//@access  Private
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);
  if (!category) {
    res.status(400).json({ message: "No category found for this id" });
  }
  res.status(200).json({ message: "Category deleted" });
});
