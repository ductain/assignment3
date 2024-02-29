module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    // req.flash("error", "Please log in first!");
    // res.redirect("/Users/Login");
    res.status(403).send("Please login first")
  },

  checkIfUser: function (req, res, next){
    // ensureAuthenticated();
    if(req.user._id === req.params.userId){
        return next()
    }
    res.status(403).send("You are not authenticated")
  },

  checkIfAdmin: function (req, res, next){
    // ensureAuthenticated();
    if (req.user.isAdmin){
        return next()
    }
    res.status(403).send("You are not allowed to do it")
  }
};
