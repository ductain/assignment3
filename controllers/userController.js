const Users = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("connect-flash");
class UserController {
  register(req, res, next) {
    const { username, password, name, YOB } = req.body;
    let errors = [];
    if (!username || !password) {
      errors.push("Please enter all fields");
    }
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      Users.findOne({ username: username }).then((user) => {
        if (user) {
          errors.push("Username already exists");
          res.status(400).json(errors);
        } else {
          const newUser = new Users({
            ...req.body,
          });
          // Hash password
          bcrypt.hash(newUser.password, 10, function (err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.status(200).json("User registered successfully");
              })
              .catch(next);
          });
        }
      });
    }
  }
  signin(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/", //dan ve trang front end nao do
      failureRedirect: "http://localhost:5000/accounts/login/failed",
      failureFlash: true,
    })(req, res, next);
  }
  signout(req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success_msg", "You are logged out");
      // req.session.destroy()
      res.clearCookie('connect.sid');
      res.redirect("/Users/Login");  //dan ve trang home ben frontend
    }
    )
    
  }
  loginSuccess(req, res, next) {
    if (req.user) {
      res.status(200).json({
        user: req.user,
      });
    }
  }
  loginFailed(req, res) {
    res.status(404).json({
      error: "Username or password is not correct",
    });
  }
  getAll(req, res, next) {
    Users.find({})
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  getById(req, res, next) {
    const userId = req.params.userId;
    Users.findById(userId)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  updateById(req, res, next) {
    // Users.findByIdAndUpdate(
    //   { _id: req.params.userId },
    //   {
    //     $set: req.body,
    //   },
    //   { new: true }
    // )
    //   .then(() => {
    //     res.status(200).json("Updated successfully!");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     res.status(500).json(error);
    //   });
    
  }
}
module.exports = new UserController();
