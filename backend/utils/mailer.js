const { Resend } = require("resend");

// Initialize Resend with key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;
let resend;

if (resendApiKey) {
  resend = new Resend(resendApiKey);
} else {
  console.warn("WARNING: RESEND_API_KEY is not defined in environment variables. Email sending will be skipped.");
}

const EMAIL_FROM = process.env.EMAIL_FROM || "JA Homes <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@jahomes.com";

/**
 * Shared HTML styling helper for luxury brand look
 */
const getLuxuryTemplate = (title, contentHtml) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body {
      font-family: 'Raleway', ui-sans-serif, system-ui, sans-serif;
      background-color: #081121;
      color: #faf9f6;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      background-color: #081121;
      width: 100%;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #0a1428;
      border: 1px solid rgba(41, 105, 194, 0.15);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .header {
      padding: 30px;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      background-color: #060d1b;
    }
    .logo {
      color: #2969c2;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      text-decoration: none;
    }
    .content {
      padding: 40px 30px;
      line-height: 1.6;
    }
    h1 {
      font-family: 'Raleway', Georgia, serif;
      font-size: 22px;
      font-weight: 300;
      color: #faf9f6;
      letter-spacing: 0.05em;
      margin-top: 0;
      margin-bottom: 20px;
      text-transform: uppercase;
    }
    p {
      color: #a1a1aa;
      font-size: 14px;
      margin-bottom: 20px;
      text-align: justify;
    }
    .highlight-box {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-left: 3px solid #2969c2;
      padding: 20px;
      border-radius: 8px;
      margin: 25px 0;
    }
    .detail-row {
      display: flex;
      margin-bottom: 10px;
      font-size: 13px;
    }
    .detail-label {
      width: 130px;
      color: #71717a;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.1em;
    }
    .detail-val {
      color: #faf9f6;
      flex: 1;
    }
    .footer {
      padding: 20px 30px;
      text-align: center;
      background-color: #060d1b;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 10px;
      color: #71717a;
      letter-spacing: 0.1em;
    }
    .cta-btn {
      display: inline-block;
      background: linear-gradient(135deg, #4e8cda 0%, #2969c2 50%, #1e40af 100%);
      color: #ffffff;
      font-size: 11px;
      font-weight: 600;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      padding: 12px 25px;
      border-radius: 30px;
      margin-top: 10px;
      box-shadow: 0 4px 12px rgba(41, 105, 194, 0.2);
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <span class="logo">JA Homes</span>
      </div>
      <div class="content">
        ${contentHtml}
      </div>
      <div class="footer">
        &copy; 2026 JA HOMES. ALL RIGHTS RESERVED.<br>
        EXCLUSIVE BIOPHILIC SANCTUARIES
      </div>
    </div>
  </div>
</body>
</html>
`;

/**
 * Sends notification and confirmation emails for contact inquiries
 */
const sendContactEmail = async (contact) => {
  if (!resend) return;

  const { _id, name, email, phone, message, interest } = contact;

  // 1. Send confirmation email to the client
  const clientHtml = getLuxuryTemplate(
    "Inquiry Received — JA Homes Concierge",
    `
    <h1>Thank You For Contacting Us</h1>
    <p>Dear ${name},</p>
    <p>We have successfully received your inquiry regarding our bespoke sanctuaries. Our concierge team is reviewing your request and will connect with you shortly to assist with your journey.</p>
    
    <div class="highlight-box">
      <div class="detail-row">
        <div class="detail-label">Reference ID:</div>
        <div class="detail-val">${_id}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Interest:</div>
        <div class="detail-val">${interest}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Your Message:</div>
        <div class="detail-val">"${message}"</div>
      </div>
    </div>
    
    <p>If you have any immediate questions, feel free to connect with our sales concierge directly via our WhatsApp portal.</p>
    `
  );

  // 2. Send notification email to the admin
  const adminHtml = getLuxuryTemplate(
    "New Concierge Inquiry Submitted",
    `
    <h1>New Inquiry Submitted</h1>
    <p>A new customer interest form has been submitted via the website.</p>
    
    <div class="highlight-box">
      <div class="detail-row">
        <div class="detail-label">Reference ID:</div>
        <div class="detail-val">${_id}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Name:</div>
        <div class="detail-val">${name}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Email:</div>
        <div class="detail-val">${email}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Phone:</div>
        <div class="detail-val">${phone || "Not Provided"}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Interest:</div>
        <div class="detail-val">${interest}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Message:</div>
        <div class="detail-val">"${message}"</div>
      </div>
    </div>
    `
  );

  try {
    // Send email to client
    await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: `We have received your inquiry [Ref: ${_id}]`,
      html: clientHtml,
    });

    // Send copy to admin
    await resend.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: `New Inquiry Received: ${interest} [Ref: ${_id}]`,
      html: adminHtml,
    });

    console.log(`Contact emails successfully sent for inquiry ${_id}`);
  } catch (error) {
    console.error("Error sending contact email via Resend:", error);
  }
};

/**
 * Sends notification and confirmation emails for bookings
 */
const sendBookingEmail = async (booking) => {
  if (!resend) return;

  const { _id, name, email, phone, date, timeSlot, tourType, property } = booking;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 1. Send confirmation email to the client
  const clientHtml = getLuxuryTemplate(
    "Your Private Sanctuary Tour Booking",
    `
    <h1>Private Tour Confirmation</h1>
    <p>Dear ${name},</p>
    <p>We are delighted to confirm your private sanctuary tour. A dedicated guide is reserved to present the biophilic spatial layout, custom masonry materials, and ecological systems of your chosen property.</p>
    
    <div class="highlight-box">
      <div class="detail-row">
        <div class="detail-label">Booking ID:</div>
        <div class="detail-val">${_id}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Property:</div>
        <div class="detail-val">${property}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Date:</div>
        <div class="detail-val">${formattedDate}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Time Slot:</div>
        <div class="detail-val">${timeSlot}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Tour Type:</div>
        <div class="detail-val">${tourType}</div>
      </div>
    </div>
    
    <p>Your itinerary details have been synchronized. If you need to make changes or reschedule your appointment, please contact your concierge representative.</p>
    <center>
      <a href="${process.env.CORS_ORIGIN || "http://localhost:3000"}/book" class="cta-btn">View My Bookings</a>
    </center>
    `
  );

  // 2. Send notification email to the admin
  const adminHtml = getLuxuryTemplate(
    "New Private Tour Booked",
    `
    <h1>New Booking Registered</h1>
    <p>A new private tour booking request has been registered via the booking concierge.</p>
    
    <div class="highlight-box">
      <div class="detail-row">
        <div class="detail-label">Booking ID:</div>
        <div class="detail-val">${_id}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Name:</div>
        <div class="detail-val">${name}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Email:</div>
        <div class="detail-val">${email}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Phone:</div>
        <div class="detail-val">${phone}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Property:</div>
        <div class="detail-val">${property}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Date:</div>
        <div class="detail-val">${formattedDate}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Time:</div>
        <div class="detail-val">${timeSlot}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Type:</div>
        <div class="detail-val">${tourType}</div>
      </div>
    </div>
    `
  );

  try {
    // Send email to client
    await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: `Your Private Tour Confirmation [ID: ${_id}]`,
      html: clientHtml,
    });

    // Send copy to admin
    await resend.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: `New Private Tour Booked: ${property} [ID: ${_id}]`,
      html: adminHtml,
    });

    console.log(`Booking emails successfully sent for reservation ${_id}`);
  } catch (error) {
    console.error("Error sending booking email via Resend:", error);
  }
};

module.exports = {
  sendContactEmail,
  sendBookingEmail,
};
