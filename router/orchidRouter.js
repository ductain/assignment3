// const orchidModel = require("../models/Orchids");
const { checkIfAdmin } = require("../config/auth");
const orchidController = require("../controllers/orchidController");
const express = require("express");
const orchidRouter = express.Router();

orchidRouter
  .route("/")
  .get(orchidController.getAll)
  .post(checkIfAdmin, orchidController.create);
orchidRouter
  .route("/:orchidId")
  .get(orchidController.getById)
  .put(checkIfAdmin, orchidController.updateById)
  .delete(checkIfAdmin, orchidController.delete);
orchidRouter
  .route('/comments/:orchidId')
  .put(orchidController.createCommentById)

module.exports = orchidRouter;
