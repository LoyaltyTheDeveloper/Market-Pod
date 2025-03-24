const generateOtpMes = (otp) => {

    const mes = `
   <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verification</title>
    <style>
        body {
            width: 100vw;
            overflow-x: hidden;
            min-height: 100vh;
            background-color: #f8f8f8;
            padding-bottom: 20px;
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 10px;
        }

        .mcard {
            background-color: #ffffff;
            border-radius: 5px;
            padding: 10px;
            text-align: left;
        }

        .numBox-container {
            text-align: center;
            margin-top: 15px;
        }

        .numBox {
            display: inline-block;
            background-color: #31603D;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border-radius: 4px;
            color: #ffffff;
            font-weight: 600;
            font-size: 16px;
            margin: 2px;
        }

        .support {
            font-style: oblique;
            color: #31603D;
        }

        .social-icons {
            text-align: center;
            margin-top: 20px;
        }

        .social-icons i {
            font-size: 20px;
            color: #31603D;
            margin: 0 5px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div style="text-align: center; margin-top: 10px;">
            <img src="https://emarketpod.com/mail-assets/logo.png" width="100" />
        </div>

        <div class="mcard" style="margin-bottom: 10px;">
            <h5 style="text-align: center;">Verification</h5>
            <p style="text-align: center;">Here’s your one-time password!</p>
        </div>
        <div class="mcard">
            <p>To complete your registration with MarketPod, please use the following One-Time Password (OTP):</p>
            <div class="numBox-container">
                <span class="numBox">${otp[0]}</span>
                <span class="numBox">${otp[1]}</span>
                <span class="numBox">${otp[2]}</span>
                <span class="numBox">${otp[3]}</span>
                <span class="numBox">${otp[4]}</span>
                <span class="numBox">${otp[5]}</span>
            </div>
            <p style="margin-top: 20px;">If you didn’t request this OTP, please contact our support team at <span
                    class="support">Support@emarketpod.com</span></p>
            <p>Best Regards, <br> The MarketPod Team</p>
            <div style="text-align: right; margin-top: 20px;">
                <img src="https://emarketpod.com/mail-assets/basket.png" width="180" />
            </div>
        </div>
        <div class="social-icons">
            <i class="fa-brands fa-whatsapp"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-youtube"></i>
            <i class="fa-brands fa-x-twitter"></i>
        </div>
    </div>
</body>

</html>
`;
    return mes;
}

module.exports = {
    generateOtpMes
}