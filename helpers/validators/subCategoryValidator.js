const { check } = require("express-validator");
const validatorsMiddleware = require("../validators");

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 char")
    .isLength({ max: 32 })
    .withMessage("Category name must be max 32 char"),
  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category id"),
  validatorsMiddleware,
];
