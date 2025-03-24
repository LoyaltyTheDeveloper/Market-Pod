const { totp , authenticator} = require("otplib");
const { connectDB } = require("../../config/db");
const { validateEmail, validatePassword, hashPassword, generateToken, comparePswd, verifyToken, sendEmail } = require("../../utils/general");
const { generateOtpMes } = require("../../utils/generateOtpMes");

const UserAuthRouter = require("express").Router();


/**
 * swagger
 * /user/signup:
 *   post:
 *     summary: User signup
 *     description: Registers a new user with an email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               pswd:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       201:
 *         description: User signed up successfully
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
 *                   example: "User signed up successfully. Please proceed to email to verify account"
 *       400:
 *         description: Bad request (missing fields or invalid email format)
 *       409:
 *         description: Email already in use
 *       500:
 *         description: Server error
 */
// UserAuthRouter.post("/signup", async (req, res) => {
//     const { email, pswd, cart } = req.body;

//     // Check if email and password are provided
//     if (!email || !pswd)
//         return res.status(400).json({ status: false, message: "Email and password are required" });

//     // Validate email format
//     if (!validateEmail(email))
//         return res.status(400).json({ status: false, message: "Invalid email format" });

//     // Validate password strength
//     const testPswd = validatePassword(pswd);
//     if (!testPswd.isValid)
//         return res.status(400).json({ status: false, message: testPswd.errors[0] });

//     let conn;

//     try {
//         conn = await (await connectDB()).getConnection();

//         // Check if email already exists
//         const [existingUser] = await conn.query("SELECT id FROM users WHERE email = ?", [email]);
//         if (existingUser.length > 0)
//             return res.status(409).json({ status: false, message: "Email already in use" });

//         // Hash password
//         const hashedPassword = await hashPassword(pswd);

//         totp.options = { step: 300,digits:6,window:1};  // OTP expires in 300 seconds (5 minutes)

//         // Generate a secret
//         // const secret = authenticator.generateSecret()// Save this secret securely

//         // console.log(secret);

//         // Generate a 6-digit OTP
//         const otp = totp.generate(process.env.OTP_SECRET);
//         console.log('Generated OTP:', otp);

//         const mes = `Welcome to marketpod your otp is :${otp}`

//         // Insert new user data into the database
//         await conn.query(
//             "INSERT INTO users (email, pswd, otp , created_at, updated_at) VALUES (?, ?,?,NOW(), NOW())",
//             [email, hashedPassword, otp]
//         );

//         res.status(201).json({ status: true, message: "User signed up successfully. please proceed to email to verify account" });
//         try {
//             await sendEmail(mes, email, 'Verification')
//         } catch (err) {
//             console.log('Error sending mail ', err);
//         }
//     } catch (err) {
//         console.error("Error during signup:", err);
//         res.status(500).json({ status: false, message: "Server error" });
//     } finally {
//         if (conn) conn.release();
//     }
// });

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: User signup
 *     description: Registers a new user with an email, password, and optional cart items.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               pswd:
 *                 type: string
 *                 example: StrongPassword123
 *               cart:
 *                 type: array
 *                 description: Array of items to be added to the user's cart upon signup.
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                       example: 101
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: User signed up successfully
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
 *                   example: "User signed up successfully. Please proceed to email to verify account"
 *       400:
 *         description: Bad request (missing fields, invalid email format, or invalid cart items)
 *       409:
 *         description: Email already in use
 *       500:
 *         description: Server error
 */

UserAuthRouter.post("/signup", async (req, res) => {
    const { email, pswd, cart } = req.body;

    // Check if email and password are provided
    if (!email || !pswd) {
        return res.status(400).json({ status: false, message: "Email and password are required" });
    }

    // Validate email format
    if (!validateEmail(email)) {
        return res.status(400).json({ status: false, message: "Invalid email format" });
    }

    // Validate password strength
    const testPswd = validatePassword(pswd);
    if (!testPswd.isValid) {
        return res.status(400).json({ status: false, message: testPswd.errors[0] });
    }

    let conn;

    try {
        conn = await (await connectDB()).getConnection();

        // Check if email already exists
        const [existingUser] = await conn.query("SELECT id FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ status: false, message: "Email already in use" });
        }

        // Hash password
        const hashedPassword = await hashPassword(pswd);

        // Generate OTP
        totp.options = { step: 300, digits: 6, window: 1 }; // OTP expires in 300 seconds (5 minutes)
        const otpToken = authenticator.generateSecret();
        const otp = totp.generate(otpToken);
        console.log("Generated OTP:", otp);

        const mes = generateOtpMes(otp);

        // Insert new user data into the database
        const [userResult] = await conn.query(
            "INSERT INTO users (email, pswd, otp, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
            [email, hashedPassword, otp]
        );

        const userId = userResult.insertId;

        // If `cart` is provided, validate and insert items
        if (cart && Array.isArray(cart)) {
            if (cart.length > 0) {
                // Validate product IDs and ensure all products are from the same store
                const productIds = cart.map((item) => item.product_id);
                const [products] = await conn.query(
                    `SELECT id, store_id , price FROM products WHERE id IN (?)`,
                    [productIds]
                );

                if (products.length !== productIds.length) {
                    return res.status(400).json({ status: false, message: "Some cart products are invalid" });
                }

                const storeId = products[0].store_id;
                const allFromSameStore = products.every((product) => product.store_id === storeId);

                if (!allFromSameStore) {
                    return res.status(400).json({ status: false, message: "All products must be from the same store" });
                }
                console.log(products);

                // Insert validated products into the cart
                const cartData = cart.map((item) => {
                    const product = products.find((p) => p.id === item.product_id);
                    return [
                        userId,
                        product.id,
                        product.store_id,
                        item.quantity || 1, // Default to quantity 1 if not provided
                        product.price, // Assuming price is in the `products` table
                        "pending"
                    ];
                });

                await conn.query(
                    `INSERT INTO cart (user_id, product_id, store_id, quantity, amount, stat)
                    VALUES ?`,
                    [cartData]
                );
            }
        }

        // Send a response
        res.status(201).json({
            status: true,
            message: "User signed up successfully. Please proceed to email to verify account",
            otpToken,
        });

        // Send verification email
        try {
            await sendEmail(mes, email, "Verification");
        } catch (err) {
            console.log("Error sending email:", err);
        }
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ status: false, message: "Server error" });
    } finally {
        if (conn) conn.release();
    }
});



/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: User signin
 *     description: Allows a user to log in with an email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               pswd:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: User signed in successfully
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
 *                   example: "User signed in successfully"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0b255aWNvbkBnbWFpbC5jb20iLCJpYXQiOjE3MzY5ODk0MjUsImV4cCI6MTczNzI0ODYyNX0._d84yXq35WFAAZEmooTTI2z0DRaokHhXHSFNJiFEuXw"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: tonyicon@gmail.com
 *                     first_name:
 *                       type: string
 *                       example: Tony
 *                     last_name:
 *                       type: string
 *                       example: Sexy
 *                     phone_number:
 *                       type: string
 *                       example: "+123456789"
 *                     phone_number2:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *       400:
 *         description: Bad request (missing fields or invalid email format)
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
UserAuthRouter.post("/signin", async (req, res) => {
    const { email, pswd } = req.body;

    // Check if email and 
    //password are provided

    if (!email || !pswd)
        return res.status(400).json({ status: false, message: "Email and password are required" });

    // Validate email format
    if (!validateEmail(email))
        return res.status(400).json({ status: false, message: "Invalid email format" });

    let conn;

    try {
        conn = await (await connectDB()).getConnection();

        // Check if user exists
        const [user] = await conn.query("SELECT * FROM users WHERE email = ?", [email]);
        if (user.length === 0)
            return res.status(404).json({ status: false, message: "User not found" });

        // Compare entered password with stored hashed password
        const isPasswordMatch = await comparePswd(pswd, user[0].pswd);

        const isVerified = user[0].stat == 1;

        if (!isPasswordMatch)
            return res.status(401).json({ status: false, message: "Incorrect password" });

        if (!isVerified)
            return res.status(401).json({ status: false, message: "Please verify your account to continue.", redirect:"verification"});

    

        // Generate token for the user
        const token = generateToken({ id: user[0].id, email });
        const created_at = updated_at = stat = undefined;
        res.status(200).json({ status: true, message: "User signed in successfully", token, user: { ...user[0], pswd: undefined, created_at, updated_at, stat,otp:undefined} });
    } catch (err) {
        console.error("Error during signin:", err);
        res.status(500).json({ status: false, message: "Server error" });
    } finally {
        if (conn) conn.release();
    }
});


/**
 * @swagger
 * /user/updateProfile:
 *   put:
 *     summary: Update user profile
 *     description: Allows an authenticated user to update their profile information.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               phone_number:
 *                 type: string
 *                 example: "+123456789"
 *               phone_number2:
 *                 type: string
 *                 example: "+123456789"
 *     responses:
 *       200:
 *         description: Profile updated successfully
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
 *                   example: "Profile updated successfully"
 *       400:
 *         description: Bad request (no fields provided for update)
 *       404:
 *         description: User not found or account not verified
 *       500:
 *         description: Server error
 */
UserAuthRouter.put("/updateProfile", verifyToken, async (req, res) => {
    const { first_name, last_name, phone_number, phone_number2 } = req.body;

    // Check if at least one field is provided for update
    if (!first_name && !last_name && !phone_number) {
        return res.status(400).json({ status: false, message: "At least one field is required to update" });
    }

    let conn;
    try {
        conn = await (await connectDB()).getConnection();

        // Building the SQL query dynamically based on the fields provided
        const fields = [];
        const values = [];

        if (first_name) { fields.push("first_name = ?"); values.push(first_name); }
        if (last_name) { fields.push("last_name = ?"); values.push(last_name); }
        if (phone_number) { fields.push("phone_number = ?"); values.push(phone_number); }
        if (phone_number2) { fields.push("phone_number2 = ?"); values.push(phone_number2); }

        values.push(req.user.id); // Add user ID for the WHERE clause

        // Update the user record
        const query = `UPDATE users SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ? AND stat = 1`;
        const [result] = await conn.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "User not found or account not verified" });
        }

        res.status(200).json({ status: true, message: "Profile updated successfully" });
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ status: false, message: "Server error" });
    } finally {
        if (conn) conn.release();
    }
});

/**
 * @swagger
 * /user/verifyOtp:
 *   post:
 *     summary: Verify OTP
 *     description: Verifies the OTP for an account and activates the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP or email
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
UserAuthRouter.post("/verifyOtp", async (req, res) => {
    const { email, otp , otpToken} = req.body;

    if (!email || !otp ) {
        return res.status(400).json({ status: false, message: "Email and OTP are required" });
    }

    if (!otpToken) {
        return res.status(400).json({ status: false, message: "Otp token is required" });
    }

    let conn;

    try {
        conn = await (await connectDB()).getConnection();

        // Check if user exists and fetch OTP
        const [user] = await conn.query("SELECT id, otp, stat , first_name,last_name,phone_number,phone_number2 FROM users WHERE email = ?", [email]);
        if (user.length === 0) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        if (user[0].stat === 1) {
            return res.status(400).json({ status: false, message: "Account already verified" });
        }

        const userData = {
            ...user[0],
            otp:undefined,
            stat:undefined,
            email:email
        }

        // Verify OTP
        if (user[0].otp !== otp) {
            return res.status(400).json({ status: false, message: "Invalid OTP" });
        }


        // const isValid = totp.check(otp,process.env.OTP_SECRET);
        // const isValid = totp.verify({token:otp,secret:process.env.OTP_SECRET,});
        const isValid = totp.verify({
            token: otp, // The OTP sent by the user
            secret: otpToken,
            step: 300, // Ensure this matches your generation step (e.g., 5 minutes)
            window: 1, // Allow a small drift (optional)
        });

        console.log(isValid, process.env.OTP_SECRET);
        if (isValid) {
            const token = generateToken({ id: user[0].id, email:email });
            await conn.query("UPDATE users SET stat = 1, otp = NULL WHERE email = ?", [email]);
            res.status(200).json({ status: true, message: "Account verified successfully",user:userData,token});

        } else {
            res.status(400).json({ status: true, message: "Your One-Time Password (OTP) has expired. Please request a new OTP to proceed with your action." });
        }

        // Update account status
    } catch (err) {
        console.error("Error verifying OTP:", err);
        res.status(500).json({ status: false, message: "Server error" });
    } finally {
        if (conn) conn.release();
    }
});

/**
 * @swagger
 * /user/resendOtp:
 *   post:
 *     summary: Resend OTP
 *     description: Resends a new OTP to the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP resent successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
UserAuthRouter.post("/resendOtp", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ status: false, message: "Email is required" });
    }

    let conn;

    try {
        conn = await (await connectDB()).getConnection();

        // Check if user exists
        const [user] = await conn.query("SELECT id, stat FROM users WHERE email = ?", [email]);
        if (user.length === 0) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        if (user[0].stat === 1) {
            return res.status(400).json({ status: false, message: "Account already verified" });
        }

        // Generate new OTP
        totp.options = { step: 300,digits:6,window:1}; // OTP expires in 5 minutes
        const otpToken = authenticator.generateSecret();
        const otp = totp.generate(otpToken);
        console.log("Resent OTP:", otp);

        const message = generateOtpMes(otp);
        // Update OTP in the database
        await conn.query("UPDATE users SET otp = ? WHERE email = ?", [otp, email]);

        // Send OTP to user email
        try {
            await sendEmail(message, email, "Resend OTP");
        } catch (err) {
            console.error("Error sending OTP email:", err);
        }

        res.status(200).json({ status: true, message: "OTP resent successfully",otpToken});
    } catch (err) {
        console.error("Error resending OTP:", err);
        res.status(500).json({ status: false, message: "Server error" });
    } finally {
        if (conn) conn.release();
    }
});

module.exports = {
    UserAuthRouter
}
