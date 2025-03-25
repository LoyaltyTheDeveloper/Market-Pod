import React from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function PrivacyPolicy() {
  return (<>
  <Navbar/>
  <div className="min-h-screen bg-[#F9F9F9]">
    <div className="pt-[120px] px-[5%] h-auto pb-[100px]">
    <div className="bg-[white] mt-[30px] flex flex-col gap-y-[20px] p-[30px] rounded-[10px]">
      <div className="font-bold text-2xl font-saeada">Privacy Policy</div>
      <div className="font-sans">Welcome to Marketpod! Your privacy is important to us, and we’re committed to safeguarding your personal information. This Privacy Policy explains how we gather, use, share, and protect your information. Please review it carefully.</div>

      <div className="font-bold font-sans">1. Information We Collect</div>
      <div className="font-sans">1.1 Personal Information<br></br>
 We collect information you provide directly to us, such as:<br></br>
Account Details: When you create an account or make a purchase, we collect your name, email, phone number, and payment information.<br></br>
Vendor Information: If you’re a vendor, we gather business details, such as business name, address, contact information, and verification documents.<br></br>
We may collect your information in various ways:<br></br>
When you purchase a product or service.<br></br>
When you register for a service, subscribe to newsletters, or participate in surveys or promotions.<br></br>
When you contact us with questions or requests.<br></br>
Additionally, with your consent or as legally permitted, we may obtain information from other sources, including fraud prevention or credit reference agencies.<br></br>
1.2 Usage Data<br></br>
We gather data on your interactions with our platform:<br></br>
Browsing Information: IP address, browser type, and operating system.<br></br>
Interaction Data: Pages viewed, features used, and time spent on our site.<br></br>
1.3 Cookies and Tracking Technologies<br></br>
Marketpod uses cookies, beacons, and similar technologies to:<br></br>
Enhance your experience by remembering preferences.<br></br>
Track platform performance and engagement.<br></br>
Provide relevant advertisements on third-party sites.</div>


<div className="font-bold font-sans">2. How We Use Your Information</div>
<div className="font-sans">2.1 Providing Services<br></br>
Your data enables us to:<br></br>
Facilitate orders and process payments.<br></br>
Enable communication between users and vendors.<br></br>
Keep you updated with order and delivery notifications.<br></br>
2.2 Communication and Marketing<br></br>
With your permission, we may use your email or phone number to send:<br></br>
Promotions, offers, and updates on new features.<br></br>
Surveys or requests for feedback to improve our services.<br></br>
2.3 Improving Our Platform<br></br>
We analyze usage data to:<br></br>
Improve our website’s functionality and security.<br></br>
Tailor content to enhance your experience.<br></br>
2.4 Compliance and Legal Obligations<br></br>
We may use or disclose your data as needed to comply with legal requirements or in response to legal requests.</div>

<div className="font-bold font-sans">3. How We Share Your Information</div>
<div className="font-sans">3.1 With Vendors<br></br>
When you place an order, we share essential details (like name and order information) with the chosen vendor to fulfill your order.<br></br>
3.2 With Service Providers<br></br>
We may share your data with third-party service providers for:<br></br>
Payment processing, order delivery, website hosting, and advertising.<br></br>
3.3 Legal Requirements<br></br>
If required, we may disclose information to comply with legal obligations, such as:<br></br>
To support legal processes, enforce agreements, or protect Marketpod’s rights, safety, or property.<br></br>
3.4 Corporate Transactions<br></br>
In the event of a merger or sale, your data may be transferred to the involved third party under confidentiality agreements.</div>


<div className="font-bold font-sans">4. Data Security</div>
<div className="font-sans">
We use industry-standard security practices to protect your data, including:<br></br>
Encryption: SSL encryption secures your data during transmission.<br></br>
Access Controls: Access to personal data is restricted by role.<br></br>
Regular Audits: We conduct regular security audits and monitoring.<br></br>
Please note that no system is completely secure, and we encourage you to protect your passwords and account access.</div>


<div className="font-bold font-sans">5. Your Privacy Choices and Rights</div>
<div className="font-sans">5.1 Access and Correction<br></br>
You can view, update, or correct your personal information in your account settings. For help, contact us at [support@emarketpod.com].<br></br>
5.2 Marketing Preferences<br></br>
You can unsubscribe from marketing emails or texts by following the instructions provided or contacting us directly.<br></br>
5.3 Do Not Track Signals<br></br>
Marketpod doesn’t currently respond to ‘Do Not Track’ browser settings, but you can manage tracking preferences using our cookie settings.</div>

<div className="font-bold font-sans">6. Cookies and Tracking Technologies</div>
<div className="font-sans">Marketpod uses cookies and similar technologies to enhance user experience, track usage, and deliver targeted ads. You can manage cookies in your browser settings, but disabling them may affect site functionality.</div>

<div className="font-bold font-sans">7. Third-Party Links and Services</div>
<div className="font-sans">Our platform may contain links to third-party sites or services. We’re not responsible for their privacy practices. Please review their policies before sharing personal data.</div>

<div className="font-bold font-sans">8. Data Retention</div>
<div className="font-sans">We retain your data as long as needed for services, legal obligations, and dispute resolution. Once it’s no longer required, data is deleted or anonymized.</div>

<div className="font-bold font-sans">9. Children's Privacy</div>
<div className="font-sans">Marketpod doesn’t knowingly collect data from children under 18. If we learn we’ve collected such information, we’ll delete it promptly.</div>

<div className="font-bold font-sans">10. Changes to This Privacy Policy</div>
<div className="font-sans">Marketpod may update this Privacy Policy at any time. Updated policies will be posted on our site with a new effective date. Continued use of our platform implies acceptance of changes.</div>

<div className="font-bold font-sans">11. Contact Us</div>
<div className="font-sans">If you have questions or concerns about this Privacy Policy, please contact us:<br></br>
Email: [support@emarketpod.com]<br></br>
By using Marketpod, you agree to this Privacy Policy and understand how we handle your information.</div>

    </div>
    </div>
  </div>
  <Footer/>
  </>)
}

export default PrivacyPolicy
