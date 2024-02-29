const express = require("express");
const categoryController = require("../controllers/categoryController");
const { checkIfAdmin } = require("../config/auth");
const categoriesRouter = express.Router();
categoriesRouter
  .route("/")
  .get(categoryController.getAll)
  .post(checkIfAdmin ,categoryController.create);
categoriesRouter
  .route("/:categoryId")
  .get(categoryController.getById)
  .put(checkIfAdmin, categoryController.updateById)
  .delete(checkIfAdmin, categoryController.delete);

module.exports = categoriesRouter;
