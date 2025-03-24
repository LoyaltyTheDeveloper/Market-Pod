const express = require("express");
const cors = require("cors");
const { siteRoute } = require("./routers/siteRouter");
require("dotenv").config();
const path = require("path");
const { adminRouter } = require("./routers/adminRouter");

const app = express();


//Api doc set up 
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { swaggerOptions } = require("./utils/swaggerConfig");
const { userRouter } = require("./routers/userRouter");
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(express.json());
app.use(cors());
app.use("/", siteRoute);
app.use("/",adminRouter);
app.use("/",userRouter);
app.use('/pod-assets', express.static(path.join(__dirname, 'pod-assets')));

const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Market Pod running on port ${port} env:${process.env.MODE}`) })