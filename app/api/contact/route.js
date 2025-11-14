export const dynamic = "force-dynamic";

import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, phone, email, message } = await req.json();

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_PASS,
      },
    });

    // 📨 1️⃣ Email to YOU (portfolio owner)
    const mailToOwner = {
      from: `" Shreya Portfolio Contact" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.CONTACT_TO || process.env.CONTACT_EMAIL,
      subject: `📬 New Message via Portfolio — From ${name}`,
      html: `
        <div style="background:#0a0a0a;color:#e0faff;padding:25px;border-radius:10px;
                    border:1px solid rgba(0,255,255,0.2);font-family:'Segoe UI',sans-serif;">
          <h2 style="color:#00ffff;margin-bottom:10px;">💌 New Message from Portfolio</h2>
          <p style="font-size:15px;margin:0 0 12px;">You’ve received a new message from your portfolio contact form.</p>
          
          <hr style="border:none;border-top:1px solid rgba(0,255,255,0.2);margin:16px 0;">

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Message:</strong></p>
          <div style="background:#111;padding:12px;border-radius:6px;
                      border:1px solid rgba(0,255,255,0.2);color:#b8ffff;">
            ${message.replace(/\n/g, "<br>")}
          </div>

          <hr style="border:none;border-top:1px solid rgba(0,255,255,0.2);margin:16px 0;">

          <p style="font-size:13px;color:#66cccc;">
            🔗 This message was sent via <strong>Shreya’s Portfolio Website</strong>.
          </p>
        </div>
      `,
    };

    // 💎 2️⃣ Beautiful confirmation email to the sender
    const mailToSender = {
      from: `"🌌 Shreya Portfolio" <${process.env.CONTACT_EMAIL}>`,
      to: email,
      subject: "✨ Thanks for reaching out to Shreya!",
      html: `
        <div style="background:linear-gradient(145deg,#000428,#004e92);
                    color:#e0ffff;padding:30px;border-radius:15px;
                    border:1px solid rgba(0,255,255,0.3);
                    font-family:'Segoe UI',sans-serif;text-align:center;">
          
          <h1 style="color:#b8ffff;">Hey ${name}! 💫</h1>
          <p style="font-size:16px;line-height:1.6;margin:20px 0;">
            Thank you for reaching out through my portfolio website! <br/>
            Your message has been received successfully, and I’ll get back to you soon.<br/><br/>
            Here’s what you sent me:
          </p>

          <div style="background:rgba(255,255,255,0.05);
                      border-radius:10px;padding:15px;
                      border:1px solid rgba(0,255,255,0.2);
                      color:#b8ffff;text-align:left;max-width:500px;margin:auto;">
            <p><strong>📩 Email:</strong> ${email}</p>
            <p><strong>📞 Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>💬 Message:</strong></p>
            <div style="background:#011a25;padding:10px;border-radius:8px;margin-top:8px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>

          <p style="margin-top:30px;font-size:14px;color:#88e0e0;">
            This confirmation was automatically sent from 
            <strong>Shreya’s Portfolio Website</strong>.
          </p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToSender);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
