const { AdminAuthRouter } = require("../controllers/admin/auth");
const GetAdminDataRouter = require("../controllers/admin/getData");
const { handleProductRoute } = require("../controllers/admin/handelProducts");
const { handleMarketRoute } = require("../controllers/admin/handleMarkets");
const { handleOrderRoute } = require("../controllers/admin/handleOrders");
const { handleStoreRoute } = require("../controllers/admin/handleStore");
const { manageAdminRoute } = require("../controllers/admin/manageAdmin");

const adminRouter = require("express").Router();

adminRouter.use("/admin",AdminAuthRouter);
adminRouter.use("/admin",handleMarketRoute);
adminRouter.use("/admin",handleStoreRoute) ;
adminRouter.use("/admin",handleProductRoute) ;
adminRouter.use("/admin",GetAdminDataRouter) ;
adminRouter.use("/admin",manageAdminRoute) ;
adminRouter.use("/admin",handleOrderRoute) ;

module.exports ={
    adminRouter
}