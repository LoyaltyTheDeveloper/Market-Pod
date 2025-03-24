const express = require("express");
const multer = require("multer");
const path = require("path");
const handleOrderRoute = express.Router();
const { appData } = require("../../utils/appData");
const { connectDB } = require("../../config/db");
const fs = require("fs");
const { validateAdminToken, allowedRoles } = require("../../utils/general");

// Set up Multer for image uploads
// Route to add a new market
handleOrderRoute.get("/orders", validateAdminToken(allowedRoles.ADMIN_SUPER_ADMIN), async (req, res) => {

    const { history } = req.query;
    let conn;

    try {

        const db = await connectDB();
        conn = await db.getConnection();

        const ordersQry = `SELECT o.* , c.carrier_name , CONCAT('${appData.getBaseUrl()}',c.logo) AS carrier_logo , 
        u.email,
        s.name AS store_name , CONCAT('${appData.getBaseUrl()}',s.image) AS store_image , s.addr AS store_address,
        m.name AS market_name , s.bank_name , s.acc_number , s.vendorName , s.vendor_number
         FROM orders o
        LEFT JOIN carriers c ON o.carrier_id = c.id 
        LEFT JOIN users u ON o.user_id = u.id 
        LEFT JOIN stores s ON o.store_id = s.id 
        LEFT JOIN markets m ON s.market_id = m.id 
        ${history == "1" ? 'WHERE  o.status IN (?) ' : 'WHERE o.status IN (?) AND o.payment_status = ? '
            }
        ORDER BY o.id DESC
        ` ;

        console.log(ordersQry);



        const [orders] = await conn.query(ordersQry, (history == "1" ? [['2','3']] : [['1','0'], '1']));

        const [carriers] = await conn.query(`SELECT id , carrier_name AS name, CONCAT('${appData.getBaseUrl()}',logo) AS logo FROM carriers`);




        const orderWithItems = await Promise.all(orders.map(async x => {
            const [items] = await conn.query(`SELECT c.amount ,c.quantity ,c.amount AS ordered_amount, 
            CONCAT(?,p.image) AS image , (p.price * c.quantity) AS current_price , p.name AS product_name , CONCAT(p.weight,' ',p.unit) AS size FROM cart c LEFT
            JOIN products p ON c.product_id = p.id WHERE c.order_id = ?`, [appData.getBaseUrl(), x.id]);
            console.log(items);
            x.items = items;
            return x;
        }))
        // Insert market dat a

        res.status(200).json({ status: true, message: "Market added successfully", data: orderWithItems, carriers });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err.message || "Server Error" });

    } finally {
        if (conn) { conn.release(); }
    }
});

handleOrderRoute.post("/orders/assign-carrier", validateAdminToken(allowedRoles.ADMIN_SUPER_ADMIN), async (req, res) => {

    let conn;
    const { orderId, carrierId } = req.body;

    if (!orderId || !carrierId)
        return res.status(400).json({ status: false, message: "Invalid parameters passed" });

    try {

        const db = await connectDB();
        conn = await db.getConnection();

        const [[carrier]] = await conn.query(`SELECT * FROM carriers WHERE id = ?`, [carrierId]);

        if (!carrier)
            return res.status(400).json({ status: false, message: "Carrier not found" });

        if (carrier.status !== 1)
            return res.status(400).json({ status: false, message: "This carrier is currently unavailable" });

        const [[order]] = await conn.query(`SELECT * FROM orders WHERE id = ?`, [orderId]);

        if (!order)
            return res.status(400).json({ status: false, message: "Order not found" });

        if (order.status == 1)
            return res.status(400).json({ status: false, message: "This Order has been completed" });

        if (order.carrier_id == carrierId)
            return res.status(400).json({ status: false, message: "This carrier is already assigned to this order" });

        const updateCarrier = await conn.query(`UPDATE orders SET carrier_id = ? WHERE id = ?`, [carrierId, orderId]);

        if (updateCarrier) {
            return res.status(200).json({
                status: true, message: "Carrier successfully Assigned",
                data: {
                    carrier_id: carrier.id, carrier_logo: appData.getBaseUrl() + carrier.logo,
                    carrier_name: carrier.carrier_name
                }
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

handleOrderRoute.get("/carriers", validateAdminToken(allowedRoles.ADMIN_SUPER_ADMIN), async (req, res) => {

    let conn;

    try {

        const db = await connectDB();
        conn = await db.getConnection();

        // Query to fetch carriers and their order count
        const carriersQuery = `
            SELECT 
                c.id AS carrier_id, 
                c.carrier_name, 
                CONCAT('${appData.getBaseUrl()}',c.logo) AS carrier_logo, 
                COUNT(o.id) AS order_count 
            FROM carriers c
            LEFT JOIN orders o ON c.id = o.carrier_id
            GROUP BY c.id, c.carrier_name, c.logo
        `;

        const [carriers] = await conn.query(carriersQuery);

        // If no carriers found
        if (!carriers.length)
            return res.status(404).json({ status: false, message: "No carriers found" });

        // Send response
        return res.status(200).json({
            status: true,
            message: "Carriers retrieved successfully",
            data: carriers
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err.message || "Server Error" });

    } finally {
        if (conn) { conn.release(); }
    }
});

handleOrderRoute.post("/orders/confirm/:orderId", validateAdminToken(allowedRoles.ADMIN_SUPER_ADMIN), async (req, res) => {
    const { orderId } = req.params;

    if (!orderId)
        return res.status(400).json({ status: false, message: "Invalid parameters passed" });

    try {

        const db = await connectDB();
        conn = await db.getConnection();


        const [[order]] = await conn.query(`SELECT * FROM orders WHERE id = ?`, [orderId]);

        if (!order)
            return res.status(400).json({ status: false, message: "Order not found" });

        if (order.status != 0)
            return res.status(400).json({ status: false, message: "This Order has been completed or canceled" });

        if (!order.carrier_id)
            return res.status(400).json({ status: false, message: "No carrier assigned to this order" });

        if (order.payment_status != 1)
            return res.status(400).json({ status: false, message: "Payment for this order hasn't been made" });

        const updateOrder = await conn.query(`UPDATE orders SET status = ? WHERE id = ?`, [1, orderId]);

        if (updateOrder) {
            return res.status(200).json({
                status: true, message: "Order successfully confirmed"
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

handleOrderRoute.post("/orders/change-status/:orderId", validateAdminToken(allowedRoles.ADMIN_SUPER_ADMIN), async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    const validStatus = [0, 1, 2, 3];
    const getStatus = (val) => {
        switch (Number(val)) {
            case 0:
                return "Awaiting Pick up";
            case 1:
                return "In Transit";
            case 2:
                return "Delivered";
            case 3:
                return "Cancled";
            default:
                return "In Transit";

        }
    }
    if (!orderId)
        return res.status(400).json({ status: false, message: "Invalid url" });

    if (!status || !validStatus.includes(Number(status)))
        return res.status(400).json({ status: false, message: "Invalid parameters passed" });

    try {

        const db = await connectDB();
        conn = await db.getConnection();


        const [[order]] = await conn.query(`SELECT * FROM orders WHERE id = ?`, [orderId]);

        if (!order)
            return res.status(400).json({ status: false, message: "Order not found" });

        if (order.status == 2 || order.status == 3)
            return res.status(400).json({ status: false, message: "This Order has been completed or canceled" });

        if (!order.carrier_id && (status == 2 || status == 1) )
            return res.status(400).json({ status: false, message: "No carrier assigned to this order" });

        if (order.payment_status != 1)
            return res.status(400).json({ status: false, message: "Payment for this order hasn't been made" });

        const updateOrder = await conn.query(`UPDATE orders SET status = ? WHERE id = ?`, [status, orderId]);

        if (updateOrder) {
            return res.status(200).json({
                status: true, message: `Order status set to ${getStatus(status)}`
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

handleOrderRoute.post("/orders/cancel/:orderId", validateAdminToken(allowedRoles.ADMIN_SUPER_ADMIN), async (req, res) => {
    const { orderId } = req.params;

    if (!orderId)
        return res.status(400).json({ status: false, message: "Invalid parameters passed" });

    try {

        const db = await connectDB();
        conn = await db.getConnection();


        const [[order]] = await conn.query(`SELECT * FROM orders WHERE id = ?`, [orderId]);

        if (!order)
            return res.status(400).json({ status: false, message: "Order not found" });

        if (order.status != 0)
            return res.status(400).json({ status: false, message: "This Order has been completed or canceled" });



        const updateOrder = await conn.query(`UPDATE orders SET status = ? WHERE id = ?`, ['2', orderId]);

        if (updateOrder) {
            return res.status(200).json({
                status: true, message: "Order successfully canceled"
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





module.exports = {
    handleOrderRoute
}
