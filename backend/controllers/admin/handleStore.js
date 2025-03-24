const handleStoreRoute = require("express").Router();


const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { connectDB } = require("../../config/db");
const { appData } = require("../../utils/appData");
const { validateAdminToken, allowedRoles } = require("../../utils/general");


// Configure multer for image uploads
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
        if (!file.mimetype.startsWith("image/")) {
            cb(new Error("Only image files are allowed"));
        } else {
            cb(null, true);
        }
    }
});

// Route to add a new store
handleStoreRoute.post("/addStore",validateAdminToken(allowedRoles.SUPER_ADMIN),upload.single("image"), async (req, res) => {
    console.log("Answer");
    const {acc_number,bank_name,name, addr, marketId, categories, openTime, closeTime,vendorName,vendor_number} = req.body;
    const imagePath = req.file ? req.file.path : null;
    let conn;

    // Function to delete image if needed
    const deleteImage = () => {
        if (imagePath) {
            fs.unlink(path.resolve(imagePath), (err) => {
                if (err) console.error("Error deleting image:", err);
            });
        }
    };

    // Check for required fields
    if (!name || !addr || !marketId || !categories || !openTime || !closeTime || !req.file  || !vendorName || !bank_name || !acc_number || !vendor_number) {
        deleteImage();
        return res.status(400).json({ status: false, message: "All fields are required." });
    }

    // Validate categories input 
    let cats;
    try{
       let ary = JSON.parse(categories);
       if(Array.isArray(ary)){
        //  console.log(ary);
         const allCats = await appData.getCategories();
         ary.map(x=>{
            let catName = appData.getCategoryById(allCats,x);
            if(!catName || catName == ''){
                throw new Error('Invalid category sent  ');
            }
         });
         cats = ary.join(' ');
       }else{
        throw new Error('Invalid categories');
       }
    }catch(err){
        deleteImage();
        return res.status(400).json({ status: false, message: "Invalid categories sent" });
    }

    try {
        // Connect to the database
        const db = await connectDB();
        conn = await db.getConnection();

        // Image URL if provided
        const imageUrl = imagePath ? `pod-assets/${req.file.filename}` : null;

        // Insert store data into the database
        await conn.query(
            "INSERT INTO stores (name, addr, market_id, image, categories,vendorName ,open_time, close_time,bank_name,acc_number,vendor_number) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?)",
            [name, addr, marketId, imageUrl,cats,vendorName,openTime, closeTime,bank_name,acc_number,vendor_number]
        );

        res.status(201).json({ status: true, message: "Store added successfully", data: { name, addr, marketId, imageUrl, categories, openTime, closeTime,bank_name,acc_number,vendor_number} });

    } catch (err) {
        console.error("Error adding store:", err);
        deleteImage();
        res.status(500).json({ status: false, message: err.message || "Server Error" });
    } finally {
        if (conn) conn.release();
    }
});

// Route to edit an existing store
handleStoreRoute.post("/editStore/:storeId",validateAdminToken(allowedRoles.SUPER_ADMIN),upload.single("image"), async (req, res) => {
    const { storeId } = req.params;
    const { name, addr,categories, openTime, closeTime, vendorName ,bank_name,acc_number,vendor_number} = req.body;
    const imagePath = req.file ? req.file.path : null;
    let conn;

    // Function to delete the old image if needed
    const deleteImage = (imagePathToDelete) => {
        if (imagePathToDelete) {
            fs.unlink(path.resolve(imagePathToDelete), (err) => {
                if (err) console.error("Error deleting image:", err);
            });
        }
    };

    // Check for required fields
    if (!name || !addr || !categories || !openTime || !closeTime || !vendorName || !bank_name || !acc_number || !vendor_number) {
        if (imagePath) deleteImage(imagePath);
        return res.status(400).json({ status: false, message: "All fields are required." });
    }

    // Validate categories input
    let cats;
    try {
        let ary = JSON.parse(categories);
        if (Array.isArray(ary)) {
            const allCats = await appData.getCategories();
            ary.forEach((x) => {
                const catName = appData.getCategoryById(allCats, x);
                if (!catName || catName === '') {
                    throw new Error('Invalid category sent');
                }
            });
            cats = ary.join(' ');
        } else {
            throw new Error('Invalid categories');
        }
    } catch (err) {
        if (imagePath) deleteImage(imagePath);
        return res.status(400).json({ status: false, message: "Invalid categories sent" });
    }

    try {
        // Connect to the database
        const db = await connectDB();
        conn = await db.getConnection();

        // Get the current store details
        const [currentStore] = await conn.query("SELECT image FROM stores WHERE id = ?", [storeId]);
        if (!currentStore.length) {
            if (imagePath) deleteImage(imagePath);
            return res.status(404).json({ status: false, message: "Store not found" });
        }

        // Image URL for new upload
        const newImageUrl = imagePath ? `pod-assets/${req.file.filename}` : currentStore[0].image;

        // Update store data in the database
        await conn.query(
            "UPDATE stores SET name = ?, addr = ?,image = ?, categories = ?, vendorName = ?, open_time = ?, close_time = ? ,bank_name = ? , acc_number = ? , vendor_number = ? WHERE id = ?",
            [name, addr,newImageUrl, cats, vendorName, openTime, closeTime, bank_name, acc_number,vendor_number,storeId]
        );

        // Delete old image if a new one was uploaded
        if (imagePath && currentStore[0].image) deleteImage(currentStore[0].image);

        res.status(200).json({ status: true, message: "Store updated successfully", data: { storeId, name, addr, newImageUrl, categories, openTime, closeTime, vendorName,bank_name,acc_number,vendor_number} });

    } catch (err) {
        console.error("Error updating store:", err);
        if (imagePath) deleteImage(imagePath);
        res.status(500).json({ status: false, message: err.message || "Server Error" }) ;
    } finally {
        if (conn) conn.release();
    }
});

handleStoreRoute.post("/open-stores/",validateAdminToken(allowedRoles.ADMIN_SUPER_ADMIN),async (req,res)=>{
    const { storeId } = req.query;
    const {status} = req.body;

    if (status !== undefined && ![1,0].includes(status))
        return res.status(400).json({ status: false, message: "Invalid parameter passed" });

    const isOpen = status == undefined ? 1:status;

    try {

        const db = await connectDB();
        conn = await db.getConnection();

        const updateOrder = await conn.query(`UPDATE stores SET is_open = ? ${storeId ? " WHERE id = ?":''}`, (storeId ? [isOpen,storeId]:[isOpen]));

        if (updateOrder) {
            return res.status(200).json({
                status: true, message: `${storeId ? 'Store' : 'Stores'} successfully ${Boolean(isOpen) ? 'Opened':'Closed'}`
            }
            );
        } else {
            throw new Error();
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err.message || "Server Error" });

    } finally {
        if (conn) { conn.release(); }
    }
});

// Handle Multer errors globally
handleStoreRoute.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ status: false, message: `Upload Error: ${err.message}` });
    } else if (err) {
        return res.status(500).json({ status: false, message: `Server Error: ${err.message}` });
    }
    next();
});

module.exports = {
    handleStoreRoute
}
