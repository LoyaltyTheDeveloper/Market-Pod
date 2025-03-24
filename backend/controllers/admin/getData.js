const { validateAdminToken } = require("../../utils/general");
const { connectDB } = require("../../config/db");
const { appData } = require("../../utils/appData");
const GetAdminDataRouter = require("express").Router();


GetAdminDataRouter.get("/get-users", async (req, res) => {
    let conn;
    try {
        // Connect to the database
        conn = await (await connectDB()).getConnection();

        // Fetch all users with relevant information
        const [users] = await conn.query("SELECT id, email, first_name, last_name, created_at,stat FROM users");

        // Check if users were found
        if (users.length === 0) {
            return res.status(404).json({ status: false, message: "No users found" });
        }

        res.status(200).json({
            status: true,
            message: "Users retrieved successfully",
            data: users
        });

    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ status: false, message: "Server error" });
    } finally {
        if (conn) conn.release();
    }
});
GetAdminDataRouter.get("/get-stat", async (req, res) => {
    let conn;
    try {
        // Connect to the database
        conn = await (await connectDB()).getConnection();

        const [[stat]] = await conn.query(`SELECT (SELECT COUNT(*) FROM orders) AS order_count, 
            (SELECT COUNT(*) FROM markets) AS market_count,
            (SELECT COUNT(*) FROM stores) AS stores_count,
            (SELECT COUNT(*) FROM carriers) AS carriers_count,
            (SELECT COUNT(*) FROM users) AS users_count,
            (SELECT COUNT(*) FROM products) AS product_count,
            (SELECT COUNT(*) FROM office_users) AS team_count
            `);

    

        res.status(200).json({
            status: true,
            data: stat
        });

    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ status: false, message: "Server error" });
    } finally {
        if (conn) conn.release();
    }
});

GetAdminDataRouter.get("/getProduct/:productId", async (req, res) => {
    let conn;
    const productId = req.params.productId;

    if (!productId) {
        return res.status(400).json({ status: false, message: "Invalid request" });
    }

    try {
        const db = await connectDB();
        conn = await db.getConnection();

        const [product] = await conn.query("SELECT p.* , c.cat_name AS category_name FROM products p INNER JOIN categories c ON p.category_id = c.id WHERE p.id = ?", [productId]);

        if (product.length === 0) {
            return res.status(400).json({ status: false, message: "Product not found" });
        }

        const productData = product[0];
        productData.image = appData.getBaseUrl() + productData.image;

        res.status(200).json({ data: productData });

    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ status: false, message: err.message || "Server Error" });
    } finally {
        if (conn) conn.release();
    }
});

GetAdminDataRouter.get("/getProducts/:storeId", async (req, res) => {
    let conn;
    const storeId = req.params.storeId;

    if (!storeId) {
        return res.status(400).json({ status: false, message: "Invalid request" });
    }

    try {
        const db = await connectDB();
        conn = await db.getConnection();

        const [products] = await conn.query("SELECT p.* , c.cat_name AS category_name FROM products p INNER JOIN categories c ON p.category_id = c.id WHERE store_id = ? ORDER BY p.name", [storeId]);

        // if (products.length === 0) {
        //     return res.status(400).json({ status: false, message: "No products found in this store" });
        // }

        const formattedProducts = products.map(product => ({
            ...product,
            image: appData.getBaseUrl() + product.image
        }));

        res.status(200).json({ data: formattedProducts });

    } catch (err) {
        console.error("Error fetching products in store:", err);
        res.status(500).json({ status: false, message: err.message || "Server Error" });
    } finally {
        if (conn) conn.release();
    }
});


module.exports = GetAdminDataRouter;
