const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { email } = JSON.parse(event.body);
    if (!email) return { statusCode: 400, body: 'Email required' };

    await resend.emails.send({
      from: 'IvoryClause <hello@ivoryclause.com>',
      to: email,
      subject: "You're on the list.",
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f0e8" style="background-color:#f5f0e8;">
          <tr>
            <td align="center" bgcolor="#f5f0e8" style="background-color:#f5f0e8; padding:40px 16px;">

              <table width="560" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f0e8" style="max-width:560px; width:100%; background-color:#f5f0e8;">

                <!-- HEADER -->
                <tr>
                  <td bgcolor="#f5f0e8" style="background-color:#f5f0e8; padding:28px 40px; border-bottom:1px solid #d9d4cc; text-align:center;">
                    <span style="font-family:Arial,sans-serif; font-size:13px; font-weight:900; letter-spacing:0.22em; text-transform:uppercase; color:#1a1a1a;">IVORYCLAUSE</span>
                  </td>
                </tr>

                <!-- BODY -->
                <tr>
                  <td bgcolor="#f5f0e8" style="background-color:#f5f0e8; padding:48px 40px 28px;">
                    <h1 style="font-family:Arial,sans-serif; font-size:38px; font-weight:900; text-transform:uppercase; color:#e8000d; margin:0 0 28px 0; letter-spacing:-0.02em; line-height:1.05;">You're on<br>the list.</h1>
                    <p style="font-family:Georgia,serif; font-size:16px; font-style:italic; line-height:1.9; color:#1a1a1a; margin:0 0 20px 0;">
                      We're putting the finishing touches on IvoryClause — attorney-reviewed contracts built for wedding professionals.
                    </p>
                    <p style="font-family:Arial,sans-serif; font-size:11px; font-weight:600; line-height:1.8; color:#e8000d; margin:0 0 28px 0; letter-spacing:0.12em; text-transform:uppercase;">
                      Fully customizable &nbsp;&middot;&nbsp; $19.99 &nbsp;&middot;&nbsp; Instant delivery
                    </p>
                    <p style="font-family:Arial,sans-serif; font-size:15px; line-height:1.8; color:#1a1a1a; margin:0;">
                      You'll be the first to know when we go live.
                    </p>
                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td bgcolor="#f5f0e8" style="background-color:#f5f0e8; padding:24px 40px 40px; border-top:1px solid #d9d4cc;">
                    <p style="font-family:Arial,sans-serif; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:#9e9890; line-height:1.9; margin:0;">
                      IvoryClause &nbsp;&middot;&nbsp; <a href="https://ivoryclause.com" style="color:#9e9890; text-decoration:none;">ivoryclause.com</a><br>
                      We did the legal homework so you don't have to.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      `
    });

    // Internal notification
    await resend.emails.send({
      from: 'IvoryClause <hello@ivoryclause.com>',
      to: 'hello@ivoryclause.com',
      subject: 'New signup: ' + email,
      html: '<p>New coming soon signup: <strong>' + email + '</strong></p>'
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return { statusCode: 500, body: error.message };
  }
};
