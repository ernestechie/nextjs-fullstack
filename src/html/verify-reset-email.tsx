interface EmailTemplateProps {
  subject: string;
  bodyText: string;
  buttonText?: string;
  link?: string;
}

export const emailTemplate = ({
  subject,
  buttonText,
  bodyText,
  link,
}: EmailTemplateProps) => `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table width="100%" bgcolor="#f4f4f4" cellpadding="0" cellspacing="0">
      <tr>
        <td align="left">
          <table width="600" bgcolor="#ffffff" cellpadding="20" cellspacing="0" style="border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <tr>
              <td align="left">
                <h2 style="color: #333;">${subject}</h2>
                <p style="color: #555; font-size: 16px;">
                  ${bodyText}
                </p>
              ${
                link &&
                `<a target="_blank" href="${link}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 5px; margin-top: 10px;">
                  ${buttonText || subject}
                </a>`
              }
                <p style="color: #888; font-size: 14px; margin-top: 15px;">
                  If you didn't request this, please ignore this email.
                </p>
                <p style="color: #888; font-size: 14px;">
                  This link will expire in 24 hours.
                </p>
              </td>
            </tr>
          </table>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            © 2025 ChatFusion. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
