const { check } = require("express-validator");
const validatorsMiddleware = require("../validators");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid id !!"),
  validatorsMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 char")
    .isLength({ max: 32 })
    .withMessage("Category name must be max 32 char"),
  validatorsMiddleware,
];
exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid id !!"),
  validatorsMiddleware,
];
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid id !!"),
  validatorsMiddleware,
];
