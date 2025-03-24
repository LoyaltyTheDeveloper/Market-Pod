const manageAdminRoute = require("express").Router();
const { connectDB } = require("../../config/db");
const { validateEmail, hashPassword, validateAdminToken, allowedRoles} = require("../../utils/general");

// Route to create a new admin
manageAdminRoute.post("/addAdmin",validateAdminToken(allowedRoles.SUPER_ADMIN),async (req, res) => {
    const { firstName, lastName, email, pswd, role, region_id, status } = req.body;
    let conn;

    try {
        // Validate required fields
        if (!firstName || !lastName || !email || !pswd || !role)
            return res.status(400).json({ status: false, message: "All fields are required." });

        if(!validateEmail(email))
            return res.status(400).json({ status: false, message: "Invalid email address" });

        // Hash the password
        const hashedPassword = await hashPassword(pswd);

        // Connect to the database
        const db = await connectDB();
        conn = await db.getConnection();

        // Insert admin into the database
        await conn.query(
            "INSERT INTO office_users (firstName, lastName, email, pswd, role, region_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [firstName, lastName, email, hashedPassword, role,1, status || 1]
        );

        res.status(201).json({ status: true, message: "Admin added successfully" });
    } catch (error) {
        console.error("Error adding admin:", error);
        res.status(500).json({ status: false, message: error.message || "Server Error" });
    } finally {
        if (conn) conn.release();
    }
});

// Route to get all admins
manageAdminRoute.get("/getAdmins", validateAdminToken(allowedRoles.SUPER_ADMIN),async (req, res) => {
    let conn;

    try {
        // Connect to the database
        const db = await connectDB();
        conn = await db.getConnection();

        // Fetch all admins
        const [admins] = await conn.query(
            "SELECT id, firstName, lastName, email, role, region_id, status FROM office_users WHERE role IN ('ADMIN', 'SUPER_ADMIN')"
        );

        res.status(200).json({ status: true, admins });
    } catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({ status: false, message: error.message || "Server Error" });
    } finally {
        if (conn) conn.release();
    }
});

// Route to activate or deactivate an admin
manageAdminRoute.post(
    "/updateAdminStatus",
    validateAdminToken(allowedRoles.SUPER_ADMIN),
    async (req, res) => {
        const { adminId, status } = req.body;
        let conn;
        try {
            // Validate input
            if (!adminId || (status !== 0 && status !== 1) )
                return res.status(400).json({ status: false, message: "Invalid input data" });
            
            if(adminId === 1)
                return res.status(400).json({ status: false, message: "Cannot deactivate root account" });

            // Connect to the database
            const db = await connectDB();
            conn = await db.getConnection();

            // Update admin status
            const [result] = await conn.query(
                "UPDATE office_users SET status = ? WHERE id = ? AND role IN ('ADMIN', 'SUPER_ADMIN')",
                [status, adminId]
            );

            if (result.affectedRows === 0) {
                return res
                    .status(404)
                    .json({ status: false, message: "Admin not found" });
            }

            res.status(200).json({
                status: true,
                message: `Admin ${status === 1 ? "activated" : "deactivated"} successfully`,
            });
        } catch (error) {
            console.error("Error updating admin status:", error);
            res.status(500).json({
                status: false,
                message: error.message || "Server Error",
            });
        } finally {
            if (conn) conn.release();
        }
    }
);

module.exports = {
    manageAdminRoute,
};
