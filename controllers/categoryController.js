const Categories = require("../models/category");

class CategoryController {
  getAll(req, res, next) {
    Categories.find({})
      .then((categories) => {
        res.status(200).json(categories);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  getById(req, res, next) {
    const categoryId = req.params.categoryId;
    Categories.findById(categoryId)
      .then((category) => {
        res.status(200).json(category);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  create(req, res, next) {
    Categories.create(req.body)
      .then((categories) => res.status(200).json(categories))
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  updateById(req, res, next) {
    Categories.findByIdAndUpdate(
      { _id: req.params.categoryId },
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
    Categories.findByIdAndDelete({ _id: req.params.categoryId })
      .then(() => {
        res.status(200).json("Deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
}

module.exports = new CategoryController();