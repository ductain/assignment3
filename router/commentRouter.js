const express = require("express");
const commentController = require("../controllers/commentController");
const commentsRouter = express.Router();
commentsRouter
  .route("/")
  .get(commentController.getAll)
  .post(commentController.create);
commentsRouter
  .route("/:commentId")
  .get(commentController.getById)
  .put(commentController.updateById)
  .delete(commentController.delete);

module.exports = commentsRouter;