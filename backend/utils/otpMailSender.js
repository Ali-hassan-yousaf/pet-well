import { sendEmail } from "./sendEmail.js";
import crypto from 'crypto';
import fs from 'fs';
export async function sendOtpMail(email, Model) {
    const otp = OtpGenerator();
    const existingUser = await Model.findOne({ email });
    if (!existingUser) {
        return { success: false, message: "User not found" };
    }
    await Model.updateOne({ email }, { otp });

    let otpTemplate = fs.readFileSync('templates/OtpSenderTemplate.html', 'utf8');
    otpTemplate = otpTemplate.replace('{{otp}}', otp);

    await sendEmail({
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp} valid for 5 minutes.`,
        html: otpTemplate,
    });

    setTimeout(async () => {
        await Model.updateOne({ email }, { otp: null });
    }, 5 * 60 * 1000);

    return { success: true, message: "OTP sent successfully" };
}

function OtpGenerator(length = 6) {
    const buffer = crypto.randomBytes(length);
    const otp = Array.from(buffer).map(b => (b % 10)).join('').slice(0, length);
    const timestamp = Date.now().toString().slice(-length);
    return (otp + timestamp).slice(0, length);
}
