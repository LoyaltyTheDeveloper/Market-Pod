const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const saltRounds = 10;

function validateEmail(email) {
    // Regular expression for validating an email address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regular expression
    return emailPattern.test(email);
}

function validatePassword(password) {
    const errors = [];

    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter.");
    }
    // if (!/[A-Z]/.test(password)) {
    //     errors.push("Password must contain at least one uppercase letter.");
    // }
    if (!/\d/.test(password)) {
        errors.push("Password must contain at least one digit.");
    }
    // if (!/[\W_]/.test(password)) {
    //     errors.push("Password must contain at least one special character.");
    // }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}


async function hashPassword(pswd){
   const hashed = await bcrypt.hash(pswd,saltRounds); 
   return hashed; 
}
async function comparePswd(pswd,encrypted) {
    const pswdMatch = await bcrypt.compare(pswd,encrypted);
    return pswdMatch;
}

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.USER_TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
};

const defaultTransport = nodemailer.createTransport({
    // service: "gmail",
    // pool: true,
    host: "das105.truehost.cloud", //<----change
    port: 587,               //<----change
    auth: {
        user: "support@emarketpod.com",
        // pass: "jephthah12345$"
        // user: "dev@tonyicon.com.ng",
        pass: "+N-hGP$yWlUe",
    },
})

// Async function to send an email
async function sendEmail(message, targetEmail,subject) {
  try {
    // Create a transporter
    const transporter = defaultTransport;
    // Email options
    const mailOptions = {
      from: 'support@emarketpod.com', // Sender address
      to: targetEmail, // Target email address
      subject: subject, // Email subject
      html: message, // Plain text body
      
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(info.response);
    console.log('Email sent:', info.messageId);
    return info.messageId; // Return the message ID
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Rethrow the error to handle it elsewhere
  }
}

// Usage example




const validateAdminToken = (allowedRoles = [1]) => {
    const validateToken = (req, res, next) => {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(token, process.env.ADMIN_TOKEN_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            if (!allowedRoles.includes(decoded.role))
                return res.status(400).json({ status: false, message: "Can't access this service" });
            req.tokenUser = decoded;
            next();
        });
    };
    return validateToken;
}

const allowedRoles ={
    ADMIN_SUPER_ADMIN:["ADMIN","SUPER_ADMIN"],
    ADMIN:["ADMIN"],
    SUPER_ADMIN:["SUPER_ADMIN"]
}

const generateToken = (user) => {
    const token = jwt.sign({ id: user.id, email: user.email },process.env.USER_TOKEN_KEY, { expiresIn: "72h" });
    return token;
};

const generateAdminToken = (user) => {
    const token = jwt.sign({ id: user.id, email: user.email , role:user.role},process.env.ADMIN_TOKEN_KEY, { expiresIn: "24h" });
    return token;
};

const generateOpenStaus = ()=>{
    const randInt  = Math.floor(Math.random() * 1000);

    return randInt%2 == 1
}

module.exports = {
    verifyToken,
    validateAdminToken,
    generateToken,
    generateAdminToken,
    validateEmail,
    validatePassword,
    hashPassword,
    comparePswd,
    generateOpenStaus,
    allowedRoles,
    defaultTransport,
    sendEmail
}