const express = require("express");
const { addSubCategory } = require("../controllers/subCategory");
const {
  createSubCategoryValidator,
} = require("../helpers/validators/subCategoryValidator");
const router = express.Router();
router.route("/").post(createSubCategoryValidator, addSubCategory);
module.exports = router;
