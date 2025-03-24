const { connectDB } = require("../../config/db");
const { appData } = require("../../utils/appData");
const { verifyToken } = require("../../utils/general");

const cartRouter = require("express").Router() ;


/**
 *swagger
 * /user/cart/add:
 *   post:
 *     summary: Add a product to the user's cart
 *     description: Adds a specified quantity of a product to the user's cart. Users can only add products from the same store to the cart. The amount and store_id are retrieved automatically based on the product_id provided.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: The ID of the product to add to the cart.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product to add to the cart.
 *             required:
 *               - product_id
 *               - quantity
 *     responses:
 *       200:
 *         description: Product added to cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product added to cart successfully
 *       400:
 *         description: Bad request. The user attempted to add products from multiple stores.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You cannot add items from a different store to your cart.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while adding the product to the cart
 */
// cartRouter.post("/cart/add", verifyToken, async (req, res) => {
//     const { product_id, quantity } = req.body;

//     if (!quantity || !product_id) {
//         return res.status(400).json({ message: 'Invalid parameters' });
//     }

//     let db;
//     try {
//         db = await (await connectDB()).getConnection();
//         // 1. Get the product details from the database to retrieve amount and store_id
//         const [productDetails] = await db.query(
//             `SELECT store_id, price AS amount FROM products WHERE id = ?`,
//             [product_id]
//         );

//         if (productDetails.length === 0) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         if (quantity <= 0) {
//             return res.status(400).json({ message: 'Invalid quantity ' });
//         }

//         const { store_id, amount } = productDetails[0];

//         // 2. Check if the user already has items in the cart from a different store
//         const [existingCart] = await db.query(
//             `SELECT DISTINCT store_id FROM cart WHERE user_id = ? AND order_id IS NULL`,
//             [req.user.id]
//         );

//         if (existingCart.length > 0 && existingCart[0].store_id !== store_id) {
//             return res.status(400).json({ message: 'You cannot add items from a different store to your cart.' });
//         }

//         // 3. Check if the product already exists in the user's cart (to update the quantity if it does)
//         const [existingProduct] = await db.query(
//             `SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND order_id IS NULL`,
//             [req.user.id, product_id]
//         );

//         if (existingProduct.length > 0) {
//             // Update the quantity and total amount if the item is already in the cart
//             await db.query(
//                 `UPDATE cart SET quantity = quantity + ?, amount = amount + ? WHERE user_id = ? AND product_id = ? AND order_id IS NULL`,
//                 [quantity, amount * quantity, req.user.id, product_id]
//             );
//         } else {
//             // 4. Insert the new item into the cart
//             await db.query(
//                 `INSERT INTO cart (user_id, product_id, store_id, quantity, amount, stat) VALUES (?, ?, ?, ?, ?,?)`,
//                 [req.user.id, product_id, store_id, quantity, amount * quantity,'pending']
//             );
//         }

//         res.status(200).json({ message: 'Product added to cart successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while adding the product to the cart' });
//     } finally {
//         if (db) { db.release(); }
//     }
// });

/**
 * @swagger
 * /user/cart/add:
 *   post:
 *     summary: Add a product to the user's cart
 *     description: Adds a product to the user's cart. Users can only add products from the same store to the cart. The amount and store_id are retrieved automatically based on the product_id provided.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: The ID of the product to add to the cart.
 *             required:
 *               - product_id
 *     responses:
 *       200:
 *         description: Product added to cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product added to cart successfully
 *       400:
 *         description: Bad request. The user attempted to add products from multiple stores.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You cannot add items from a different store to your cart.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while adding the product to the cart
 */
cartRouter.post("/cart/add", verifyToken, async (req, res) => {
    const { product_id } = req.body;

    if (!product_id) {
        return res.status(400).json({ message: 'Invalid parameters' });
    }

    let db;
    try {
        db = await (await connectDB()).getConnection();
        // Get product details
        const [productDetails] = await db.query(
            `SELECT store_id, price AS amount FROM products WHERE id = ?`,
            [product_id]
        );

        if (productDetails.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const { store_id, amount } = productDetails[0];

        // Check for multiple stores in the cart
        const [existingCart] = await db.query(
            `SELECT DISTINCT store_id FROM cart WHERE user_id = ? AND order_id IS NULL`,
            [req.user.id]
        );

        if (existingCart.length > 0 && existingCart[0].store_id !== store_id) {
            return res.status(400).json({ message: 'You cannot add items from a different store to your cart.' });
        }

        // Insert the product into the cart
        await db.query(
            `INSERT INTO cart (user_id, product_id, store_id, quantity, amount, stat) VALUES (?, ?, ?, ?, ?, ?)`,
            [req.user.id, product_id, store_id, 1, amount, 'pending']
        );

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the product to the cart' });
    } finally {
        if (db) db.release();
    }
});

/**
 * @swagger
 * /user/cart/update-quantity:
 *   patch:
 *     summary: Update the quantity of a product in the cart
 *     description: Updates the quantity of an existing product in the user's cart.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: The ID of the product in the cart.
 *               quantity:
 *                 type: integer
 *                 description: The new quantity for the product.
 *             required:
 *               - product_id
 *               - quantity
 *     responses:
 *       200:
 *         description: Cart item quantity updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Product not found in the cart.
 *       500:
 *         description: Internal server error.
 */
cartRouter.patch("/cart/update-quantity", verifyToken, async (req, res) => {
    const { product_id, quantity } = req.body;

    if (!product_id || quantity == null || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid parameters' });
    }

    let db;
    try {
        db = await (await connectDB()).getConnection();

        const [cartItem] = await db.query(
            `SELECT amount , quantity AS current_quantity FROM cart WHERE user_id = ? AND product_id = ? AND order_id IS NULL`,
            [req.user.id, product_id]
        );

        if (cartItem.length === 0) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }

        const { amount , current_quantity } = cartItem[0];

        await db.query(
            `UPDATE cart SET quantity = ?, amount = ? WHERE user_id = ? AND product_id = ? AND order_id IS NULL`,
            [quantity, (amount/current_quantity) * quantity, req.user.id, product_id]
        );

        res.status(200).json({ message: 'Cart item quantity updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the cart item' });
    } finally {
        if (db) db.release();
    }
});


/**
 * @swagger
 * /cart/remove:
 *   delete:
 *     summary: Remove a product from the user's cart
 *     description: Removes a specified product from the user's cart if it exists and is not associated with an order.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: The ID of the product to remove from the cart.
 *             required:
 *               - product_id
 *     responses:
 *       200:
 *         description: Product removed from cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product removed from cart successfully
 *       404:
 *         description: Product not found in cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found in cart
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while removing the product from the cart
 */
cartRouter.delete("/cart/remove", verifyToken, async (req, res) => {
    const { product_id } = req.body;
    let db;
    try {
        db = await (await connectDB()).getConnection();
        // Check if the product exists in the user's cart and is not assigned to an order
        const [existingProduct] = await db.query(
            `SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND order_id IS NULL`,
            [req.user.id, product_id]
        );

        if (existingProduct.length === 0) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Remove the product from the cart
        await db.query(
            `DELETE FROM cart WHERE user_id = ? AND product_id = ? AND order_id IS NULL`,
            [req.user.id, product_id]
        );

        res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while removing the product from the cart' });
    }finally{
        if(db){db.release()}
    }
});

/**
 * @swagger
 * /cart/remove-all:
 *   delete:
 *     summary: Removes all products from the user's cart
 *     description: Removes all products from the user's cart if it exists and is not associated with an order.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product removed from cart successfully.
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
 *                   example: Product removed from cart successfully
 *       404:
 *         description: Product not found in cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Product not found in cart
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while removing the product from the cart
 */
cartRouter.delete("/cart/remove-all", verifyToken, async (req, res) => {
    const { product_id } = req.body;
    let db;
    try {
        db = await (await connectDB()).getConnection();
        // Check if the product exists in the user's cart and is not assigned to an order
        const [existingProduct] = await db.query(
            `SELECT * FROM cart WHERE user_id = ?  AND order_id IS NULL`,
            [req.user.id]
        );

        if (existingProduct.length === 0) {
            return res.status(404).json({ message: 'No product found in cart' });
        }

        // Remove the product from the cart
        await db.query(
            `DELETE FROM cart WHERE user_id = ? AND order_id IS NULL`,
            [req.user.id]
        );

        res.status(200).json({ message: 'Products successfully removed from cart.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while removing products from the cart' });
    }finally{
        if(db){db.release()}
    }
});


/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get all products in the user's cart
 *     description: Retrieves all products currently in the user's cart with additional product details like name, description, and weight.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all products in the user's cart with additional details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   product_id:
 *                     type: integer
 *                   store_id:
 *                     type: integer
 *                   quantity:
 *                     type: integer
 *                   amount:
 *                     type: number
 *                   stat:
 *                     type: string
 *                   image:
 *                     type: string
 *                   sub_title:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   weight:
 *                     type: number
 *                   price:
 *                     type: number
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while retrieving the cart products
 */
cartRouter.get("/cart", verifyToken, async (req, res) => {
    let db;
    try {
        db = await (await connectDB()).getConnection();
        // Query to get cart items with additional product details
        const [cartItems] = await db.query(
            `SELECT cart.product_id, cart.store_id, cart.quantity, cart.amount, cart.stat, cart.added_at,
                    product.name, product.description, product.weight, product.price , CONCAT('${appData.getBaseUrl()}',product.image) AS image , product.subtitle
             FROM cart
             JOIN products product ON cart.product_id = product.id
             WHERE cart.user_id = ? AND cart.order_id IS NULL`,
            [req.user.id]
        );

        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the cart products' });
    }finally{
        if(db){db.release()}
    }
});


module.exports = {
    cartRouter
}
