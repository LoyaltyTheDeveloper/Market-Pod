const { siteDataRoute } = require("../controllers/site/getData");

const siteRoute = require("express").Router();

// siteRoute.get("/site", async (req, res) => {
//     const cats = [
//         {
//             name:"Happiness Goods & Store",
//             addr:"No 34 off GRA, Adelewola Akinwuyi Road, Ilorin, Kwara State.",
//             categories:[1,2,6,7,8,9],
//             image:"pod-assets/maket1.png",
//             openTime:"10:30 AM",
//             closeTime:"05:30 PM",
//             marketId:1
//         },
//         {
//             name:"Mama Ifeoma Store",
//             addr:"No 34 off GRA, Adelewola Akinwuyi Road, Ilorin, Kwara State.",
//             categories:[1,2,6,7],
//             image:"pod-assets/img1.png",
//             openTime:"09:30 AM",
//             closeTime:"10:30 PM",
//             marketId:1
//         },
//         {
//             name:"Triple Tee Store",
//             addr:"No 34 off GRA, Adelewola Akinwuyi Road, Ilorin, Kwara State.",
//             categories:[1,4,2,3],
//             image:"pod-assets/img2.png",
//             openTime:"09:30 AM",
//             closeTime:"10:30 PM",
//             marketId:2
//         },
//         {
//             name:"Radiant Stores",
//             addr:"No 34 off GRA, Adelewola Akinwuyi Road, Ilorin, Kwara State.",
//             categories:[1,7,5,10],
//             image:"pod-assets/img3.png",
//             openTime:"09:30 AM",
//             closeTime:"10:30 PM",
//             marketId:2
//         },
//         {
//             name:"Stormlight Superstore",
//             addr:"No 34 off GRA, Adelewola Akinwuyi Road, Ilorin, Kwara State.",
//             categories:[3,5,7,9],
//             image:"pod-assets/img4.png",
//             openTime:"09:30 AM",
//             closeTime:"10:30 PM",
//             marketId:3
//         },
//         {
//             name:"Wuraola Store",
//             addr:"No 34 off GRA, Adelewola Akinwuyi Road, Ilorin, Kwara State.",
//             categories:[1,3,5],
//             image:"pod-assets/img6.png",
//             openTime:"09:00 AM",
//             closeTime:"10:30 PM",
//             marketId:3
//         },
//     ];

//     const conn = await connectDB();
//     try {
//         const inserted = await Promise.all(cats.map(async x => {
//             await conn.query("INSERT INTO stores(name,market_id,addr,image,categories,open_time,close_time) VALUES(?,?,?,?,?,?,?)", [x.name,x.marketId,x.addr,x.image,x.categories.join(" "),x.openTime,x.closeTime]);
//         }))
//         if (inserted) {
//             console.log("Done Boy");
//         }
//         res.status(200).json({ message:"Markets Set"});
//     } catch (err) {
//         console.log(err);
//     } finally {
//         conn.releaseConnection();
//     }

// });

siteRoute.use("/site", siteDataRoute);

module.exports = {
    siteRoute
}