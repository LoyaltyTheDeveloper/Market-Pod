const express = require("express");
const multer = require("multer");
const path = require("path");
const handleMarketRoute = express.Router();
const { appData } = require("../../utils/appData");
const { connectDB } = require("../../config/db");
const fs = require("fs");

// Set up Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'pod-assets/'); // Ensure pod-assets exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
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

// Route to add a new market
handleMarketRoute.post("/addMarket", upload.single("image"), async (req, res) => {
    const { name, addr } = req.body;
    const imagePath = req.file ? req.file.path : null;
    function deleteImg() {
        if (imagePath) {
            fs.unlink(path.resolve(imagePath), (unlinkErr) => {
                if (unlinkErr) {
                    console.error("Error deleting image:", unlinkErr);
                }
            });
        }
    }
    let conn;

    // Check required fields
    if (!name || !addr || !req.file) {
        deleteImg();
        return res.status(400).json({ status: false, message: "Name, address, and image are required." });
    }

    try {
        // Get image URL
        const imageUrl = `pod-assets/${req.file.filename}`;

        // Connect to database
        const db = await connectDB();
        conn = await db.getConnection();

        // Insert market data
        await conn.query("INSERT INTO markets (name, addr, image) VALUES (?, ?, ?)", [name, addr, imageUrl]);

        res.status(201).json({ status: true, message: "Market added successfully", data: { name, addr, imageUrl } });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err.message || "Server Error" });
        deleteImg();
    } finally {
        if (conn) { conn.release(); }
    }
});

handleMarketRoute.post("/editMarket/:id", upload.single("image"), async (req, res) => {
    const { name, addr } = req.body;
    const marketId = req.params.id;
    const newImagePath = req.file ? req.file.path : null;
    let conn;

    const deleteImage = (imagePath) => {
        if (imagePath) {
            fs.unlink(path.resolve(imagePath), (unlinkErr) => {
                if (unlinkErr) {
                    console.error("Error deleting image:", unlinkErr);
                }
            });
        }
    };

    try {
        // Database connection
        const db = await connectDB();
        conn = await db.getConnection();

        // Get existing market data to retrieve the current image path
        const [existingMarket] = await conn.query("SELECT image FROM markets WHERE id = ?", [marketId]);

        if (existingMarket.length === 0) {
            if (newImagePath) deleteImage(newImagePath);
            return res.status(404).json({ status: false, message: "Market not found" });
        }

        // Check if we need to delete the old image
        const oldImagePath = existingMarket[0].image ? path.join('pod-assets', path.basename(existingMarket[0].image)) : null;
        if (newImagePath && oldImagePath) {
            deleteImage(oldImagePath);
        }

        // Construct the image URL for the new image, if uploaded
        const imageUrl = newImagePath ? `pod-assets/${req.file.filename}` : existingMarket[0].image;

        // Update market data in the database
        await conn.query("UPDATE markets SET name = ?, addr = ?, image = ? WHERE id = ?", [name, addr, imageUrl, marketId]);

        res.status(200).json({
            status: true,
            message: "Market updated successfully",
            data: { id: marketId, name, addr, imageUrl }
        });

    } catch (err) {
        console.error("Error updating market:", err);
        if (newImagePath) deleteImage(newImagePath);
        res.status(500).json({ status: false, message: err.message || "Server Error" });
        
    } finally {
        if (conn) conn.release();
    }
});

// Handle Multer errors globally
handleMarketRoute.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ status: false, message: `Upload Error: ${err.message}` });
    } else if (err) {
        return res.status(500).json({ status: false, message: `Server Error: ${err.message}` });
    }
    next();
});

module.exports = {
    handleMarketRoute
}
