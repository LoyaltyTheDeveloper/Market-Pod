const { UserAuthRouter } = require("../controllers/users/auth");
const { cartRouter } = require("../controllers/users/cart");
const { orderRouter } = require("../controllers/users/order");

const userRouter = require("express").Router();


userRouter.use("/user", UserAuthRouter);
userRouter.use("/user", cartRouter);
userRouter.use("/user", orderRouter);

module.exports =  {
    userRouter
}