const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { connectDB } = require("../../config/db");
const { validateAdminToken, allowedRoles } = require("../../utils/general");
// const { connectDB } = require("./database"); // Import database connection helper
const handleProductRoute = express.Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'pod-assets');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit to 2MB
    fileFilter: (req, file, cb) => {
        console.log("Hiiii ")
        if (!file.mimetype.startsWith("image/")) {
            cb(new Error("Only image files are allowed"));
        } else {
            cb(null, true);
        }
    }
});

// Route to add a product
handleProductRoute.post("/addProduct",validateAdminToken(allowedRoles.ADMIN_SUPER_ADMIN),upload.single("image"), async (req, res) => {
    const { name, subTitle, storeId,category, status, price, weight, description,unit} = req.body;
    const imagePath = req.file ? req.file.path : null;

    // Delete image if necessary
    const deleteImage = () => {
        if (imagePath) {
            fs.unlink(path.resolve(imagePath), (err) => {
                if (err) console.error("Error deleting image:", err);
            });
        }
    };

    if(!unit || !['Kg','g'].includes(unit)){
        deleteImage();
        return res.status(400).json({ status: false, message: "No valid unit sent" });
    }

    // Validate required fields
    if (!name || !storeId || !category || !price || !req.file) {
        deleteImage();
        return res.status(400).json({ status: false, message: "Name, storeId, marketId, category, price, and image are required." });
    }

    let conn;
    try {
        // Connect to the database
        const db = await connectDB();
        conn = await db.getConnection();

        // Check if storeId exists
        const [store] = await conn.query("SELECT id , market_id FROM stores WHERE id = ?", [storeId]);
        if (store.length === 0) {
            deleteImage();
            return res.status(400).json({ status: false, message: "Invalid storeId. Store does not exist." });
        }

        const  marketId = store[0].market_id;

        // Get image URL
        const imageUrl = `pod-assets/${req.file.filename}`;

        // Insert product data into the products table
        await conn.query(
            "INSERT INTO products (name, subtitle, store_id, market_id, image, category_id, status, price, weight, description,unit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
            [name, subTitle, storeId, marketId, imageUrl, category, status || 1, price, weight, description,unit]
        );

        res.status(201).json({
            status: true,
            message: "Product added successfully",
            data: { name, subTitle, storeId, marketId, imageUrl, category, status, price, weight, description,unit}
        });

    } catch (err) {
        console.error("Error adding product:", err);
        deleteImage();
        res.status(500).json({ status: false, message: err.message || "Server Error" });
    } finally {
        if (conn) conn.release();
    }
});

// Route to edit an existing product
handleProductRoute.post("/editProduct/:productId",validateAdminToken(allowedRoles.ADMIN_SUPER_ADMIN),upload.single("image"), async (req, res) => {
    const { productId } = req.params;
    const { name, subTitle, storeId, category, price, weight, description , unit,status} = req.body;
    const newImagePath = req.file ? req.file.path : null;

    let conn;

    // Helper function to delete old image
    const deleteImage = (imagePath) => {
        if (imagePath) {
            fs.unlink(path.resolve(imagePath), (err) => {
                if (err) console.error("Error deleting image:", err);
            });
        }
    };

    if(unit && !['Kg','g'].includes(unit)){
        deleteImage();
        return res.status(400).json({ status: false, message: "Invalid unit sent" });
    }

    try {
        // Connect to the database
        const db = await connectDB();
        conn = await db.getConnection();

        // Retrieve current product information
        const [product] = await conn.query("SELECT * FROM products WHERE id = ?", [productId]);
        if (product.length === 0) {
            deleteImage(newImagePath);
            return res.status(404).json({ status: false, message: "Product not found." });
        }

        const currentProduct = product[0];
        let imageUrl = currentProduct.image;

        // If a new image is uploaded, delete the old one and update the image URL
        if (newImagePath) {
            deleteImage(imageUrl);
            imageUrl = `pod-assets/${req.file.filename}`;
        }

        // Update product in the database
        await conn.query(
            "UPDATE products SET name = ?, status = ? ,subtitle = ?, store_id = ?, category_id = ?, price = ?, weight = ?, description = ?, image = ? , unit = ? WHERE id = ?",
            [
                name || currentProduct.name,
                status || currentProduct.status,
                subTitle || currentProduct.subtitle,
                storeId || currentProduct.store_id,
                category || currentProduct.category_id,
                // status !== undefined ? status : currentProduct.status,
                price || currentProduct.price,
                weight || currentProduct.weight,
                description || currentProduct.description,
                imageUrl,
                unit || currentProduct.unit,
                productId,

            ]
        );

        res.status(200).json({
            status: true,
            message: "Product updated successfully",
            data: { name, subTitle, storeId, category, price, weight, description, imageUrl }
        });

    } catch (err) {
        console.error("Error updating product:", err);
        deleteImage(newImagePath); // Delete new image if there was an error
        res.status(500).json({ status: false, message: err.message || "Server Error" });
    } finally {
        if (conn) conn.release();
    }
});


handleProductRoute.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ status: false, message: `Upload Error: ${err.message}` });
    } else if (err) {
        return res.status(500).json({ status: false, message: `Server Error: ${err.message}` });
    }
    next();
});

module.exports ={
    handleProductRoute
}
