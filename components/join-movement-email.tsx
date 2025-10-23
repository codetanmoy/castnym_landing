interface JoinMovementEmailProps {
  firstName: string
}

export function joinMovementEmail({ firstName }: JoinMovementEmailProps) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 24px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden;">
            <tr>
              <td style="padding: 32px;">
                <p style="margin: 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; color: #0f172a;">Welcome</p>
                <h1 style="margin: 16px 0 24px; font-size: 28px; color: #0f172a;">Welcome to the Licensed Identity Movement 👋</h1>
                <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #1f2937;">
                  Hi ${firstName},
                </p>
                <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #1f2937;">
                  You’re officially part of the Licensed Identity Movement — where creators and brands are taking back consent, compensation, and control in the age of AI.
                </p>

                <h2 style="margin: 24px 0 12px; font-size: 18px; color: #0f172a;">🔹 What’s next</h2>
                <ul style="margin: 0 0 24px 20px; padding: 0; color: #1f2937; font-size: 16px; line-height: 1.6;">
                  <li>We’ll confirm your early-access spot soon.</li>
                  <li>Creator onboarding opens late November.</li>
                  <li>Buyer access follows mid December.</li>
                </ul>

                <h2 style="margin: 24px 0 12px; font-size: 18px; color: #0f172a;">🔹 Help us grow the movement</h2>
                <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #1f2937;">
                  Every share counts. Tell your friends, collaborators, or creative partners to join early:
                </p>

                <table cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                  <tr>
                    <td style="padding-right: 8px;">
                      <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://castnym.com&title=Licensed%20Identity%20Movement%20by%20Castnym&summary=I%20just%20joined%20the%20Licensed%20Identity%20Movement%20by%20%40Castnym%20%E2%80%94%20a%20new%20platform%20that%20puts%20consent,%20ownership,%20and%20payment%20back%20in%20the%20hands%20of%20real%20people.%0A%0AYour%20face%20is%20your%20digital%20identity.%20Own%20it.%0A%F0%9F%91%89%20castnym.com" style="display: inline-block; padding: 12px 18px; background-color: #0A66C2; color: #ffffff; text-decoration: none; border-radius: 999px; font-size: 14px; font-weight: 600;">
                        Share on LinkedIn
                      </a>
                    </td>
                    <td style="padding-right: 8px;">
                      <a href="https://www.instagram.com/" style="display: inline-block; padding: 12px 18px; background-color: #db2777; color: #ffffff; text-decoration: none; border-radius: 999px; font-size: 14px; font-weight: 600;">
                        Share on Instagram Stories
                      </a>
                    </td>
                    <td>
                      <a href="https://castnym.com" style="display: inline-block; padding: 12px 18px; background-color: #111827; color: #ffffff; text-decoration: none; border-radius: 999px; font-size: 14px; font-weight: 600;">
                        Copy Link
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #1f2937;">
                  Share text (copy &amp; paste):
                </p>

                <div style="margin-bottom: 24px; padding: 16px; background-color: #f1f5f9; border-radius: 12px; color: #1f2937; font-size: 15px; line-height: 1.6;">
                  <p style="margin: 0;">
                    I just joined the Licensed Identity Movement by @Castnym — a new platform that puts consent, ownership, and payment back in the hands of real people.
                    <br /><br />
                    Your face is your digital identity. Own it.
                    <br /><br />
                    👉 <a href="https://castnym.com" style="color: #0ea5e9;">castnym.com</a>
                  </p>
                </div>

                <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #1f2937;">
                  Thanks for being part of something bigger.
                  <br />— Team CastNym
                </p>

                <p style="margin: 32px 0 0; font-size: 13px; line-height: 1.6; color: #6b7280;">
                  CastNym will never use your face for AI model training without your explicit permission.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `
}
