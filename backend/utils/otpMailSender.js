import { sendEmail } from "./sendEmail.js";
import crypto from 'crypto';

let template=`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #f4f7ff;
        background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
        background-repeat: no-repeat;
        background-size: 800px 452px;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <table style="width: 100%">
          <tbody>
            <tr style="height: 0">
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-paw-print text-pet-blue animate-paw-bounce"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="4" r="2"></circle>
                  <circle cx="18" cy="8" r="2"></circle>
                  <circle cx="20" cy="16" r="2"></circle>
                  <path
                    d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"
                  ></path>
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <main>
        <div
          style="
            margin: 0;
            margin-top: 70px;
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto">
            <h1
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              "
            >
              Your OTP
            </h1>

            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              OTP is valid for
              <span style="font-weight: 600; color: #1f1f1f">5 minutes</span>.
              Do not share this code with others
            </p>
            <p
              style="
                margin: 0;
                margin-top: 60px;
                font-size: 40px;
                font-weight: 600;
                letter-spacing: 25px;
                color: #ba3d4f;
              "
            >
              {{otp}}
            </p>
          </div>
        </div>
      </main>
    </div>
  </body>
</html>
`
export async function sendOtpMail(email, Model) {
    const otp = OtpGenerator();
    const existingUser = await Model.findOne({ email });
    if (!existingUser) {
        return { success: false, message: "User not found" };
    }
    await Model.updateOne({ email }, { otp });

    let otpTemplate = template.replace('{{otp}}', otp);

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
