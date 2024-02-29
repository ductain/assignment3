const express = require("express");
const mongoose = require("mongoose");
const categoryRouter = require('./router/categoryRouter')
const orchidRouter = require('./router/orchidRouter')
const commentRouter = require('./router/commentRouter')
const userRouter = require('./router/userRouter')
const session = require("express-session");
const passport = require("passport");
const flash = require('connect-flash')
const port = 5000;
const app = express();

const connect = mongoose.connect("mongodb://127.0.0.1:27017/Assignment3");
connect.then(
  (db) => {
    console.log("Database connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

require("./config/passport")(passport);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(express.json());
app.use("/categories", categoryRouter);
app.use("/orchids", orchidRouter);
app.use("/comments", commentRouter);
app.use('/accounts', userRouter)
app.listen(port, () => {
  console.log("Server is running.");
});
