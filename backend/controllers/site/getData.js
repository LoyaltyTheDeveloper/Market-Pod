const { connectDB } = require("../../config/db");
const { appData } = require("../../utils/appData");
const { generateOpenStaus } = require("../../utils/general");
const siteDataRoute = require("express").Router();

/**
 * @swagger
 * /site/getLocations:
 *   get:
 *     summary: Get all delivery locations
 *     description: Returns a list of delivery locations with their IDs and names.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 locations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Al Hikmah"
 *       500:
 *         description: Server error
 */
siteDataRoute.get("/getLocations", async (req, res) => {
    let conn;
    try {
        // Connect to the database
        const db = await connectDB();
        conn = await db.getConnection();

        // Fetch locations from the delivery_fees table
        const [locations] = await conn.query("SELECT id, location AS name FROM delivery_fees");

        res.status(200).json({ locations });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err.message || "Server Error" });
    } finally {
        // Release the connection
        if (conn) { conn.release(); }
    }
});

/**
 * @swagger
 * /site/getCategories:
 *   get:
 *     summary: Get all categories
 *     description: Returns a list of categories with their IDs and names.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Electronics"
 *       500:
 *         description: Server error
 */
siteDataRoute.get("/getCategories", async (req, res) => {
    let conn;
    const { storeId } = req.query;
    try {
        //
        const db = await connectDB();
        conn = await db.getConnection();
        if (storeId) {
            console.log('has Store');
        }

        const [categories] = await conn.query("SELECT id , cat_name AS name FROM categories");

        if (!storeId)
            return res.status(200).json({ categories });

        const [store] = await conn.query('SELECT categories FROM stores WHERE id = ?', [storeId]);

        if (store.length === 0)
            return res.status(400).json({ status: false, message: "No valid store found" });

        const cats = store[0].categories.split(' ');
        console.log(cats);
        return res.status(200).json({
            categories: categories.filter(x => {
                return cats.includes(String(x.id));
            })
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err.message || "Server Error" });
    } finally {
        if (conn) { conn.release() }
    }
});

/**
 * @swagger
 * /site/getMarkets:
 *   get:
 *     summary: Get all markets
 *     description: Returns a list of markets with their IDs, names, and addresses.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 markets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Downtown Market"
 *                       addr:
 *                         type: string
 *                         example: "123 Market St, Springfield"
 *       500:
 *         description: Server error
 */
siteDataRoute.get("/getMarkets", async (req, res) => {
    let conn;
    try {
        //
        const db = await connectDB();
        conn = await db.getConnection();

        const [markets] = await conn.query("SELECT id , name , addr , image FROM markets");

        res.status(200).json({ markets: markets.map(x => ({ ...x, image: appData.getBaseUrl() + x.image})) });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err || "Server Error" });
    } finally {
        if (conn) { conn.release() }
    }
})

/**
 * @swagger
 * /site/getMarket/{id}:
 *   get:
 *     summary: Get a market by ID
 *     description: Returns the details of a market by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the market to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Downtown Market"
 *                     addr:
 *                       type: string
 *                       example: "123 Market St, Springfield"
 *       400:
 *         description: Market not found
 *       500:
 *         description: Server error
 */
siteDataRoute.get("/getMarket/:id", async (req, res) => {
    let conn;
    const marketId = req.params.id;
    if (!marketId)
        return res.status(400).json({ status: false, message: "Invalid request" });

    try {
        //
        const db = await connectDB();
        conn = await db.getConnection();

        const [markets] = await conn.query("SELECT id , name , addr , image FROM markets WHERE id = ?", [marketId]);

        if (markets.length < 1)
            return res.status(400).json({ status: false, message: "Market not found" })

        const market = markets[0];
        market.image = `${appData.getBaseUrl()}${market.image}`

        res.status(200).json({ data: {...market} });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err || "Server Error" });
    } finally {
        if (conn) { conn.release() }
    }
})

/**
 * @swagger
 * /site/getStores/{marketId}:
 *   get:
 *     summary: Get stores by market ID along with market details
 *     description: Returns the details of a specific market along with a list of stores for the given market ID.
 *     parameters:
 *       - name: marketId
 *         in: path
 *         required: true
 *         description: ID of the market to retrieve stores for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 market:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Downtown Market"
 *                     addr:
 *                       type: string
 *                       example: "123 Market St, Springfield"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/images/market.png"
 *                 stores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Shop A"
 *                       image:
 *                         type: string
 *                         example: "https://example.com/images/shopA.png"
 *                       openTime:
 *                         type: string
 *                         example: "09:00 AM"
 *                       closeTime:
 *                         type: string
 *                         example: "05:00 PM"
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 10
 *                             name:
 *                               type: string
 *                               example: "Electronics"
 *       400:
 *         description: Invalid request or market not found
 *       500:
 *         description: Server error
 */

siteDataRoute.get("/getStores/:marketId", async (req, res) => {
    let conn;
    const marketId = req.params.marketId;

    if (!marketId)
        return res.status(400).json({ status: false, message: "Invalid request" });

    try {
        //
        const db = await connectDB();
        conn = await db.getConnection();

        // Fetch market data
        const [marketData] = await conn.query("SELECT id, name, addr, image FROM markets WHERE id = ?", [marketId]);

        if (marketData.length === 0)
            return res.status(404).json({ status: false, message: "Market not found" });

        const market = {
            ...marketData[0],
            image: appData.getBaseUrl() + marketData[0].image
        };


        const [stores] = await conn.query("SELECT * FROM stores WHERE market_id = ?", [marketId]);

        const categories = await appData.getCategories();
        const storeData = stores.map(x => {
            let cats = x.categories.split(" ");
            cats = cats.map(x => {
                return appData.getCategoryById(categories, x);
            })
            return { ...x, stat: undefined, image: appData.getBaseUrl() + x.image, cats: x.categories.split(" "), categories: cats,isOpen:Boolean(x.is_open)}
        })

        res.status(200).json({ stores: storeData, market });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err || "Server Error" });
    } finally {
        if (conn) { conn.release() }
    }
});

/**
 * @swagger
 * /site/getStore/{storeId}:
 *   get:
 *     summary: Get a store by ID
 *     description: Returns the details of a store by its ID.
 *     parameters:
 *       - name: storeId
 *         in: path
 *         required: true
 *         description: ID of the store to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Shop A"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/images/shopA.png"
 *                     openTime:
 *                       type: string
 *                       example: "09:00 AM"
 *                     closeTime:
 *                       type: string
 *                       example: "05:00 PM"
 *       400:
 *         description: Store not found
 *       500:
 *         description: Server error
 */
siteDataRoute.get("/getStore/:storeId", async (req, res) => {
    let conn;
    const storeId = req.params.storeId;

    if (!storeId)
        return res.status(400).json({ status: false, message: "Invalid request" });

    try {
        
        //
        const db = await connectDB();
        conn = await db.getConnection();

        const [stores] = await conn.query("SELECT * FROM stores WHERE id = ?", [storeId]);

        if (stores.length < 1)
            return res.status(400).json({ status: false, message: "Store not found" });

        const store = stores[0];
        const categories = await appData.getCategories();

        let cats = store.categories.split(" ");
        cats = cats.map(x => {
            return appData.getCategoryById(categories, x);
        })

        store.stat = undefined;
        store.image = appData.getBaseUrl() + store.image
        store.cats = store.categories.split(" ");
        store.categories = cats
        store.isOpen = Boolean(store.is_open)
        res.status(200).json({ data: store });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err || "Server Error" });
    } finally {
        if (conn) { conn.release() }
    }
});

/**
 * @swagger
 * /site/getData:
 *   get:
 *     summary: Get data to be displayed on the landing page 
 *     description: Returns data for a limited number of markets and stores.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 markets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Downtown Market"
 *                       addr:
 *                         type: string
 *                         example: "123 Market St, Springfield"
 *                       stores:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             name:
 *                               type: string
 *                               example: "Shop A"
 *                             image:
 *                               type: string
 *                               example: "https://example.com/images/shopA.png"
 *                             openTime:
 *                               type: string
 *                               example: "09:00 AM"
 *                             closeTime:
 *                               type: string
 *                               example: "05:00 PM"
 *       500:
 *         description: Server error
 */

siteDataRoute.get("/getData", async (req, res) => {
    let conn;
    try {
        //
        const db = await connectDB();
        db.rel

        conn = await db.getConnection();

        const [markets] = await conn.query("SELECT id , name , addr FROM markets");

        const categories = await appData.getCategories();

        const marketData = await Promise.all(markets.map(async x => {
            const [stores] = await conn.query("SELECT * FROM stores WHERE market_id = ? LIMIT 0,4", [x.id]);

            const storeData = stores.map(x => {
                let cats = x.categories.split(" ");
                cats = cats.map(x => {
                    return appData.getCategoryById(categories, x);
                })
                return { ...x, stat: undefined, image: appData.getBaseUrl() + x.image, categories: cats,isOpen:Boolean(x.is_open)}
            })

            return { ...x, stores: storeData}

        }));

        res.status(200).json({ markets: marketData });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err || "Server Error" });
        throw new Error(err);
    } finally {
        if (conn) { conn.release() }
    }
});

/**
 * @swagger
 * /site/getProduct/{productId}:
 *   get:
 *     summary: Retrieve product details by ID
 *     description: Fetches product details by its ID, including category information and a list of recommended products.
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: The unique identifier of the product.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Product ID.
 *                     name:
 *                       type: string
 *                       description: Product name.
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: Product price.
 *                     category_name:
 *                       type: string
 *                       description: Name of the product's category.
 *                     image:
 *                       type: string
 *                       description: URL of the product image.
 *                 peopleAlsoBought:
 *                   type: array
 *                   description: List of related products.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Product ID.
 *                       name:
 *                         type: string
 *                         description: Product name.
 *                       price:
 *                         type: number
 *                         format: float
 *                         description: Product price.
 *                       product_image:
 *                         type: string
 *                         description: URL of the product image.
 *                       subtitle:
 *                         type: string
 *                         description: Product subtitle.
 *                       description:
 *                         type: string
 *                         description: Product description.
 *       400:
 *         description: Invalid request or product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
siteDataRoute.get("/getProduct/:productId", async (req, res) => {
    let conn;
    const productId = req.params.productId;

    if (!productId) {
        return res.status(400).json({ status: false, message: "Invalid request" });
    }

    try {
        const db = await connectDB();
        conn = await db.getConnection();

        const [product] = await conn.query(`SELECT p.* , c.cat_name AS category_name , s.name AS store_name
             FROM products p 
             INNER JOIN categories c ON p.category_id = c.id 
             INNER JOIN stores s ON p.store_id = s.id 
             WHERE p.id = ? AND p.status = ?`, [productId,1]);

        const [peopleAlsoBought] = await conn.query(`SELECT name,price,CONCAT('${appData.getBaseUrl()}',image) AS product_image , status , subtitle,description,id FROM products  ORDER BY RAND() LIMIT 4`);


        if (product.length === 0) {
            return res.status(400).json({ status: false, message: "Product not found" });
        }

        const productData = product[0];
        productData.image = appData.getBaseUrl() + productData.image;

        res.status(200).json({ data: productData , peopleAlsoBought});

    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ status: false, message: err.message || "Server Error" });
    } finally {
        if (conn) conn.release();
    }
});

/**
 * @swagger
 * /site/getProducts/{storeId}:
 *   get:
 *     summary: Get all products in a specific store
 *     description: Returns the details of all products available in a specific store by storeId.
 *     parameters:
 *       - name: storeId
 *         in: path
 *         required: true
 *         description: ID of the store to retrieve products from
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *       400:
 *         description: Store not found
 *       500:
 *         description: Server error
 */
siteDataRoute.get("/getProducts/:storeId", async (req, res) => {
    let conn;
    const storeId = req.params.storeId;

    if (!storeId) {
        return res.status(400).json({ status: false, message: "Invalid request" });
    }

    try {
        const db = await connectDB();
        conn = await db.getConnection();

        const [products] = await conn.query("SELECT p.* , c.cat_name AS category_name FROM products p INNER JOIN categories c ON p.category_id = c.id WHERE store_id = ? AND status = ? ORDER BY p.name", [storeId,1]);

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

siteDataRoute.get("/lagos-locations");

/**
 * @swagger
 * /onboard-vendor:
 *   post:
 *     summary: Onboard a new vendor
 *     description: Adds a new vendor's business profile to the database.
 *     tags:
 *       - Vendor Management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessName:
 *                 type: string
 *                 description: The name of the business.
 *                 example: "Tech Supplies Ltd."
 *               firstName:
 *                 type: string
 *                 description: Vendor's first name.
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: Vendor's last name.
 *                 example: "Doe"
 *               storeAddress:
 *                 type: string
 *                 description: Physical address of the store.
 *                 example: "123 Main Street, Downtown"
 *               state:
 *                 type: string
 *                 description: The state where the business is located.
 *                 example: "California"
 *               country:
 *                 type: string
 *                 description: The country where the business is located.
 *                 example: "USA"
 *               years:
 *                 type: integer
 *                 description: Number of years the business has been operating.
 *                 example: 5
 *               idType:
 *                 type: string
 *                 description: Type of identification (e.g., Passport, National ID).
 *                 example: "National ID"
 *               idNumber:
 *                 type: string
 *                 description: Identification number.
 *                 example: "123456789"
 *               phonePrimary:
 *                 type: string
 *                 description: Primary phone number.
 *                 example: "+1234567890"
 *               phoneAlternate:
 *                 type: string
 *                 description: Alternate phone number.
 *                 example: "+0987654321"
 *               email:
 *                 type: string
 *                 description: Vendor's email address.
 *                 example: "vendor@example.com"
 *               whatsapp:
 *                 type: string
 *                 description: Vendor's WhatsApp number.
 *                 example: "+1234567890"
 *               activeDays:
 *                 type: array
 *                 description: Days the business is active.
 *                 items:
 *                   type: string
 *                   example: "Monday"
 *               openingTime:
 *                 type: string
 *                 format: time
 *                 description: Opening time (24-hour format).
 *                 example: "09:00:00"
 *               closingTime:
 *                 type: string
 *                 format: time
 *                 description: Closing time (24-hour format).
 *                 example: "18:00:00"
 *               bankName:
 *                 type: string
 *                 description: Name of the bank.
 *                 example: "Bank of America"
 *               accountNumber:
 *                 type: string
 *                 description: Bank account number.
 *                 example: "9876543210"
 *               accountName:
 *                 type: string
 *                 description: Bank account holder's name.
 *                 example: "John Doe"
 *               products:
 *                 type: array
 *                 description: List of products sold by the business.
 *                 items:
 *                   type: string
 *                   example: "Laptops"
 *     responses:
 *       200:
 *         description: Successfully onboarded the vendor.
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
 *                   example: "Business profile successfully added"
 *       500:
 *         description: Server error.
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
 *                   example: "Server Error"
 */
siteDataRoute.post("/onboard-vendor", async (req, res) => {
    const {
        businessName,
        firstName,
        lastName,
        storeAddress,
        state,
        country,
        years,
        idType,
        idNumber,
        phonePrimary,
        products,
        phoneAlternate,
        email,
        whatsapp,
        activeDays,
        openingTime,
        closingTime,
        bankName,
        accountNumber,
        accountName
    } = req.body;

    // Concatenate arrays to strings
    const productsString = Array.isArray(products) ? products.join(" , ") : products;
    const activeDaysString = Array.isArray(activeDays) ? activeDays.join(" , ") : activeDays;

    const checkQuery = `
        SELECT COUNT(*) AS count FROM business_profiles 
        WHERE business_name = ? OR email = ?
    `;

    const insertQuery = `
        INSERT INTO business_profiles (
            business_name, first_name, last_name, store_address, state, country, years, 
            id_type, id_number, phone_primary, phone_alternate, email, whatsapp, 
            active_days, opening_time, closing_time, bank_name, account_number, 
            account_name, products
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        const db = await connectDB();
        conn = await db.getConnection();

        // Check for duplicate businessName or email
        const [rows] = await conn.query(checkQuery, [businessName, email]);
        if (rows[0].count > 0) {
            return res.status(400).json({
                status: false,
                message: "Business name or email already exists"
            });
        }

        // Insert new record
        await conn.query(insertQuery, [
            businessName,
            firstName,
            lastName,
            storeAddress,
            state,
            country,
            years,
            idType,
            idNumber,
            phonePrimary,
            phoneAlternate,
            email,
            whatsapp,
            activeDaysString,
            openingTime,
            closingTime,
            bankName,
            accountNumber,
            accountName,
            productsString
        ]);

        res.status(200).json({ status: true, message: "Business profile successfully added" });

    } catch (err) {
        console.error("Error adding business profile", err);
        res.status(500).json({ status: false, message: err.message || "Server Error" });
    } finally {
        if (conn) conn.release();
    }
});

// /**
//  * @swagger
//  * /site/search:
//  *   get:
//  *     summary: Search for markets, stores, and products
//  *     description: Returns a list of markets, stores, and products matching the search query.
//  *     parameters:
//  *       - name: query
//  *         in: query
//  *         required: true
//  *         description: The search query string.
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Successful response
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 results:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *                     properties:
//  *                       type:
//  *                         type: string
//  *                         enum: [market, store, product]
//  *                       data:
//  *                         type: object
//  *                         properties:
//  *                           id:
//  *                             type: integer
//  *                             example: 1
//  *                           name:
//  *                             type: string
//  *                             example: "Market A"
//  *                           addr:
//  *                             type: string
//  *                             example: "123 Market St"
//  *                           image:
//  *                             type: string
//  *                             example: "https://example.com/image.jpg"
//  *       500:
//  *         description: Server error
//  */
// siteDataRoute.get("/search", async (req, res) => {
//     let conn;
//     const query = req.query.query;

//     if (!query) {
//         return res.status(400).json({ status: false, message: "Search query is required" });
//     }

//     try {
//         const db = await connectDB();
//         conn = await db.getConnection();

//         // Search markets
//         const [markets] = await conn.query(
//             `SELECT id, name, addr, image FROM markets WHERE name LIKE ?`,
//             [`%${query}%`]
//         );
//         const marketResults = markets.map((market) => ({
//             type: "market",
//             data: { ...market, image: appData.getBaseUrl() + market.image },
//         }));

//         // Search stores
//         const [stores] = await conn.query(
//             `SELECT id, name, image FROM stores WHERE name LIKE ?`,
//             [`%${query}%`]
//         );
//         const storeResults = stores.map((store) => ({
//             type: "store",
//             data: { ...store, image: appData.getBaseUrl() + store.image },
//         }));

//         // Search products
//         const [products] = await conn.query(
//             `SELECT p.id, p.name, p.image, c.cat_name AS category_name FROM products p 
//              INNER JOIN categories c ON p.category_id = c.id WHERE p.name LIKE ?`,
//             [`%${query}%`]
//         );
//         const productResults = products.map((product) => ({
//             type: "product",
//             data: { ...product, image: appData.getBaseUrl() + product.image },
//         }));

//         // Combine all results
//         const results = [...marketResults, ...storeResults, ...productResults];


//         res.status(200).json({ results });
//     } catch (err) {
//         console.error("Error during search:", err);
//         res.status(500).json({ status: false, message: "Server Error" });
//     } finally {
//         if (conn) conn.release();
//     }
// });

/**
 * @swagger
 * /site/search:
 *   get:
 *     summary: Search markets, stores, and products by query.
 *     description: Performs a search across markets, stores, and products based on the given query string. Returns a combined list of results, including matched markets, stores with random products, and products grouped by store.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: The search term used to filter markets, stores, and products.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved search results.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         description: The type of the result (e.g., "market", "store").
 *                       data:
 *                         type: object
 *                         description: The detailed data of the result item.
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The ID of the market, store, or product.
 *                           name:
 *                             type: string
 *                             description: The name of the market, store, or product.
 *                           addr:
 *                             type: string
 *                             description: The address of the market (if applicable).
 *                           image:
 *                             type: string
 *                             description: The full URL of the image.
 *                           description:
 *                             type: string
 *                             description: The description of the product (if applicable).
 *                           price:
 *                             type: number
 *                             description: The price of the product (if applicable).
 *                           status:
 *                             type: string
 *                             description: The availability status of the product (if applicable).
 *                           categories:
 *                             type: array
 *                             items:
 *                               type: string
 *                             description: Categories associated with the store or product.
 *                           products:
 *                             type: array
 *                             items:
 *                               type: object
 *                               description: Random products for the store.
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   description: The ID of the product.
 *                                 name:
 *                                   type: string
 *                                   description: The name of the product.
 *                                 image:
 *                                   type: string
 *                                   description: The full URL of the product image.
 *                                 description:
 *                                   type: string
 *                                   description: The product description.
 *                                 price:
 *                                   type: number
 *                                   description: The product price.
 *                                 subtitle:
 *                                   type: string
 *                                   description: The product price.
 *                                 status:
 *                                   type: string
 *                                   description: The product availability status.
 *       400:
 *         description: Bad request. The search query is missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Search query is required"
 *       500:
 *         description: Server error during search operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Server Error"
 */
siteDataRoute.get("/search", async (req, res) => {
    let conn;
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ status: false, message: "Search query is required" });
    }

    try {
        const db = await connectDB();
        conn = await db.getConnection();

        // Search markets
        const [markets] = await conn.query(
            `SELECT id, name, addr, image FROM markets WHERE name LIKE ?`,
            [`%${query}%`]
        );
        const marketResults = markets.map((market) => ({
            type: "market",
            data: { ...market, image: appData.getBaseUrl() + market.image },
        }));

        // Search stores
        const [stores] = await conn.query(
            `SELECT * FROM stores WHERE name LIKE ?`,
            [`%${query}%`]
        );

        const storeResults = [];

        const categories = await appData.getCategories();
        for (const store of stores) {
            // Get 3 random products for the store if the store name matches
            let cats = store.categories.split(" ");
            cats = cats.map(x => {
                return appData.getCategoryById(categories, x);
            });
            store.categories = cats;
            const [randomStoreProducts] = await conn.query(
                `SELECT id, name, image , description , price , status , subtitle FROM products WHERE store_id = ? AND status = ? ORDER BY RAND() LIMIT 3`,
                [store.id ,1]
            );

            storeResults.push({
                type: "store",
                data: {
                    ...store,
                    isOpen:Boolean(store.is_open),
                    image: appData.getBaseUrl() + store.image,
                    products: randomStoreProducts.map((product) => ({
                        ...product,
                        image: appData.getBaseUrl() + product.image,
                    })),
                },
            });
        }

        // Search products
        const [products] = await conn.query(
            `SELECT id, name, image,description , price , status , store_id , subtitle  FROM products  
            id WHERE name LIKE ?`,
            [`%${query}%`]
        );

        const groupedResults = {};

        for (const product of products) {
            const storeId = product.store_id;

            if (!groupedResults[storeId]) {
                // Fetch store details and 2 random products if not already fetched
                const [[store]] = await conn.query(
                    `SELECT * FROM stores WHERE id = ?`,
                    [storeId]
                );

                let cats = store.categories.split(" ");
                cats = cats.map(x => {
                    return appData.getCategoryById(categories, x);
                });
                store.categories = cats;
                store.isOpen = Boolean(store.is_open);


                const [randomProducts] = await conn.query(
                    `SELECT id, name, image ,description , price , status , subtitle FROM products WHERE store_id = ? AND id != ? ORDER BY RAND() LIMIT 2`,
                    [storeId, product.id]
                );

                groupedResults[storeId] = {
                    type: "store",
                    data: {
                        ...store,
                        image: appData.getBaseUrl() + store.image,
                        products: [],
                    },
                };

                groupedResults[storeId].data.products.push(
                    ...randomProducts.map((randProd) => ({
                        ...randProd,
                        image: appData.getBaseUrl() + randProd.image,
                    }))
                );
            }

            // Add the matched product to the store's product list
            groupedResults[storeId].data.products.unshift({
                ...product,
                image: appData.getBaseUrl() + product.image,
            });
        }

        // Combine all results
        const results = [
            ...marketResults,
            ...Object.values(groupedResults),
            ...storeResults,
        ];

        res.status(200).json({ results });
    } catch (err) {
        console.error("Error during search:", err);
        res.status(500).json({ status: false, message: "Server Error" });
    } finally {
        if (conn) conn.release();
    }
});

module.exports = {
    siteDataRoute
}
