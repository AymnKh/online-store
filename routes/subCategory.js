const express = require("express");
const { addSubCategory, getSubCategories, getSubCategory, updateSubCategory, deleteSubCategory } = require("../controllers/subCategory");
const {
  createSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator,
} = require("../helpers/validators/subCategoryValidator");
const router = express.Router();
router
  .route("/")
  .get(getSubCategories)
  .post(createSubCategoryValidator, addSubCategory);
router
  .route("/:id")
  .put(updateSubCategoryValidator, updateSubCategory)
  .get(getSubCategoryValidator, getSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);
module.exports = router;
