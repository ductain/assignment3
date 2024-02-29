const { orchids } = require("../models/orchid");

class OrchidController {
  getAll(req, res, next) {
    orchids
      .find({})
      .populate("category")
      .then((orchids) => {
        res.status(200).json(orchids);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  getById(req, res, next) {
    const orchidId = req.params.orchidId;
    orchids
      .findById(orchidId)
      .then((orchid) => {
        res.status(200).json(orchid);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  create(req, res, next) {
    orchids
      .create(req.body)
      .then((orchid) => res.status(200).json(orchid))
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  updateById(req, res, next) {
    orchids
      .findByIdAndUpdate(
        { _id: req.params.orchidId },
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
  createCommentById(req, res, next) {
    orchids
    .findOneAndUpdate(
      { _id: req.params.orchidId, "comments.author": { $ne: req.user._id } },
      {
        $push: {
          comments: req.body,
        },
      },
      { new: true }
    )
    .then((updatedOrchid) => {
      if (!updatedOrchid) {
        return res.status(400).json("You have already commented on this orchid.");
      }
      res.status(200).json("Comment added successfully!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
  }
  delete(req, res, next) {
    orchids
      .findByIdAndDelete({ _id: req.params.orchidId })
      .then(() => {
        res.status(200).json("Deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
}

module.exports = new OrchidController();
