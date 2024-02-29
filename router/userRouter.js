var express = require("express");
const userController = require("../controllers/userController");
const { checkIfAdmin, ensureAuthenticated, checkIfUser } = require("../config/auth");
var userRouter = express.Router();

userRouter
    .route("/")
    .get(checkIfAdmin, userController.getAll);
userRouter
    .route("/:userId")
    .get(userController.getById)
    .put(userController.updateById)
userRouter
    .route("/user/register")
    .post(userController.register);
userRouter
    .route("/user/login")
    .post(userController.signin);
userRouter
    .route("/user/logout")
    .get(userController.signout);
userRouter
    .route("/user/login/success")
    .get(userController.loginSuccess);
userRouter
    .route("/user/login/failed")
    .get(userController.loginFailed);

module.exports = userRouter;
