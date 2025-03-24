const { connectDB } = require("../../config/db");
const { validateEmail, comparePswd, generateAdminToken} = require("../../utils/general");

const AdminAuthRouter = require("express").Router();

AdminAuthRouter.post("/signin",async (req, res) => {
    const { email, pswd } = req.body;

    if (!email || !pswd)
        return res.status(400).json({ status: false, message: "Invalid parameters " });

    if (!validateEmail(email) )
        return res.status(400).json({ status: false, message: "Invalid email" });

    let pool ;
    try {
        pool = await (await connectDB()).getConnection();
    
        sql = "SELECT * FROM office_users WHERE email = ?" ;
        const [user] = await pool.query(sql, [email]);
        if (user.length < 1)
            return res.status(400).json({ status: false, message: "Invalid account" });
        //console.log(user[0]);
        const pswdMatch = await comparePswd(pswd, user[0]['pswd']);
        if (!pswdMatch)
            return res.status(400).json({ status: false, message: "Invalid password" });

        if (user[0]['stat'] == 0)
            return res.status(400).json({ status: false, message: "Your account is currently deactivated" });


        const token = generateAdminToken(user[0]);
        const userData = {
            id: user[0]['id'],
            firstName: user[0]['firstName'],
            lastName: user[0]['lastName'],
            role: user[0]['role']
        }
        res.status(200).json({ status: true, message: `Welcome ${user[0]['firstName']} ${user[0]['lastName']}`, token: token, data: userData });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error :" });
    } finally {
        if (pool) {
            pool.release();
        }
    }
});

module.exports = {
    AdminAuthRouter
}