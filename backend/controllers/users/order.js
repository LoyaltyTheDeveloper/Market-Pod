const express = require("express");
const { connectDB } = require("../../config/db");
const { verifyToken } = require("../../utils/general");
const crypto = require("crypto");
const orderRouter = express.Router();

/**
 * @swagger
 * /user/order/create:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order for the user based on their cart and delivery location.
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location_id:
 *                 type: integer
 *                 description: The location ID for delivery.
 *               address:
 *                 type: string
 *                 description: The delivery address.
 *               full_name:
 *                 type: string
 *                 description: Full name of the user placing the order.
 *               phone_number:
 *                 type: string
 *                 description: Contact phone number of the user.
 *               note:
 *                 type: string
 *                 description: (Optional) Additional notes for the order.
 *             required:
 *               - location_id
 *               - address
 *               - full_name
 *               - phone_number
 *     responses:
 *       200:
 *         description: Order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Order created successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     order_id:
 *                       type: string
 *                       description: Unique ID of the newly created order.
 *                     delivery_fee:
 *                       type: number
 *                       description: The delivery fee for the order.
 *                     service_charge:
 *                       type: number
 *                       description: The calculated service charge for the order.
 *                     total_pay:
 *                       type: number
 *                       description: The total amount payable, including delivery and service charges.
 *       400:
 *         description: Bad request due to missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All fields are required.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error. Please try again later.
 */
function generateOrderId() {
    return crypto.randomBytes(5).toString('hex').slice(0, 6).toUpperCase();
}

orderRouter.post("/order/create", verifyToken, async (req, res) => {
    const { location_id, address, full_name, phone_number, note } = req.body;
    const city = 'Ilorin';
    const state = 'Kwara';

    console.log(!address,full_name);

    if (!location_id || !address || !full_name, !phone_number) 
        return res.status(400).json({ message: "All fields are required." });

    let db;
    try {
        db = await (await connectDB()).getConnection();
        // 2. Get the store_id and market_id
        const [storeData] = await db.query(
            `SELECT DISTINCT c.store_id,s.market_id , s.is_open FROM cart c LEFT JOIN stores s ON c.store_id = s.id  WHERE c.user_id = ? AND c.order_id IS NULL`,
            [req.user.id]
        );
        console.log("Ohhh chim", storeData)

        if (storeData.length === 0) {
            return res.status(400).json({ message: "No items in the cart or invalid store." });
        }

        const { store_id, market_id , is_open } = storeData[0];

        if(is_open == 0)
            return res.status(400).json({ message: "This store is currently closed you cannot proceed with this order." });

        let selectedColumn;

        switch(Number(market_id)){
            case 1:
                selectedColumn =  'yoruba_road_fee';
                break;
            case 6:
                selectedColumn =  'mandate_fee';
                break;
            case 4:
                selectedColumn =  'ipata_fee';
                break;
            case 2:
                selectedColumn =  'oja_tuntun_fee';
                break;
            default:
                selectedColumn =  'ipata_fee';
                break;
        }

        // 1. Validate location_id
        const [locationData] = await db.query(
            `SELECT id, location AS location_name, ${selectedColumn} AS delivery_fee FROM delivery_fees WHERE id = ?`,
            [location_id]
        );

        if (locationData.length === 0) {
            return res.status(400).json({ message: "Invalid location ID." });
        }

        const { location_name, delivery_fee } = locationData[0];


        const isEmpty = (str) => (str == "" || str == null);

        if (isEmpty(full_name) || isEmpty(phone_number))
            return res.status(400).json({ message: "Name and phone number cannot be empty " });
        // 3. Calculate product amount from the cart
        const [cartData] = await db.query(
            `SELECT SUM(amount * quantity) AS product_amount FROM cart WHERE user_id = ? AND order_id IS NULL`,
            [req.user.id]
        );

        const { product_amount } = cartData[0];

        let percent;
        
        if(product_amount > 0 && product_amount < 20000){
            percent = 0.05
        }else if(product_amount >= 20000 && product_amount < 50000){
            percent = 0.03;
        }else if(product_amount >= 50000 && product_amount < 100000){
            percent =(1.75 / 100);
        }else if(product_amount >= 100000 && product_amount < 500000){
            percent =(0.75 / 100);
        }else{
            percent =(0.5 / 100);
        }


        if (!product_amount) {
            return res.status(400).json({ message: "Cart is empty." });
        }

        let orderId;
        let orderExists = true;
        do {
            orderId = generateOrderId();
            const [existingOrder] = await db.query('SELECT id FROM orders WHERE id = ?', [orderId]);
            if (existingOrder.length === 0) {
                orderExists = false;
            }
        } while (orderExists);


        const service_charge = product_amount * percent;
        const total_pay = Number(service_charge) + Number(product_amount) + Number(delivery_fee)

        // 4. Insert into orders table
        const [orderResult] = await db.query(
            `INSERT INTO orders (id,user_id, product_amount, delivery_amount,total_pay,service_charge,status, store_id, created_at, updated_at, full_name,phone_number,note, location_name, address, city, state)
             VALUES (?,?, ?, ?, ?, ?, ? ,? , NOW(), NOW(),?,?,?,?, ?, ?, ?)`,
            [
                orderId,
                req.user.id,
                product_amount,
                delivery_fee,
                total_pay,
                service_charge,
                '0',
                store_id, // Include store_id he re
                full_name,
                phone_number,
                note ?? '',
                location_name,
                address,
                city,
                state,
            ]
        );

        const order_id = orderId;

        // 5. Update cart items with the new order_id
        await db.query(
            `UPDATE cart SET order_id = ?, stat = ? WHERE user_id = ? AND order_id IS NULL`,
            [order_id, 'ordered', req.user.id]
        );

        res.status(200).json({
            status: true,
            message: "Order created successfully.",
            data: { order_id, delivery_fee,service_charge,total_pay},
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again later." });
    } finally {
        if (db) db.release();
    }
});

/**
 * @swagger
 * /user/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve all orders made by the authenticated user. order status , `0` for `Awaiting Pick up` , `1` for `In Transit` , `2` for `Delivered` , `3` for `Cancled`. for the `payment_status` `0` for `unpaid` `1` for `paid`
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       order_id:
 *                         type: integer
 *                         description: The ID of the order.
 *                       product_amount:
 *                         type: number
 *                         description: Total product amount.
 *                       payment_status:
 *                         type: number
 *                         description: Payment status of the order.
 *                       delivery_amount:
 *                         type: number
 *                         description: Delivery fee for the order.
 *                       status:
 *                         type: string
 *                         description: Status of the order.
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: When the order was created.
 *                       location_name:
 *                         type: string
 *                         description: The name of the delivery location.
 *                       address:
 *                         type: string
 *                         description: The delivery address.
 *                       city:
 *                         type: string
 *                         description: The city of the delivery.
 *                       state:
 *                         type: string
 *                         description: The state of the delivery.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error. Please try again later.
 */

// API endpoint to fetch all orders
orderRouter.get("/orders", verifyToken, async (req, res) => {
    let db;
    try {
        db = await (await connectDB()).getConnection();

        const [orders] = await db.query(
            `SELECT id AS order_id, product_amount, delivery_amount,total_pay,service_charge,status, created_at, location_name, address, city, state , payment_status
             FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
            [req.user.id]
        );

        res.status(200).json({ status: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again later." });
    } finally {
        if (db) db.release();
    }
});

module.exports = {
    orderRouter
};
