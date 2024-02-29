const {comments} = require("../models/orchid");

class CommentController {
  getAll(req, res, next) {
    comments.find({})
    .populate('author')
      .then((comments) => {
        res.status(200).json(comments);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  getById(req, res, next) {
    const commentId = req.params.commentId;
    comments.findById(commentId)
      .then((comment) => {
        res.status(200).json(comment);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  create(req, res, next) {
    comments.create(req.body)
      .then((categories) => res.status(200).json(categories))
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  updateById(req, res, next) {
    comments.findByIdAndUpdate(
      { _id: req.params.commentId },
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(() => {
        res.status(200).json("Updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  delete(req, res, next) {
    comments.findByIdAndDelete({ _id: req.params.commentId })
      .then(() => {
        res.status(200).json("Deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
}

module.exports = new CommentController();