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
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f5f0e8; color: #1a1a1a;">

          <!-- HEADER -->
          <div style="background: #f5f0e8; padding: 32px 40px; border-bottom: 1px solid rgba(26,26,26,0.12); text-align: center;">
            <span style="font-family: Arial, sans-serif; font-size: 15px; font-weight: 900; letter-spacing: 0.18em; text-transform: uppercase; color: #1a1a1a;">IVORYCLAUSE</span>
          </div>

          <!-- BODY -->
          <div style="padding: 52px 40px 40px;">

            <h1 style="font-size: 36px; font-weight: 900; text-transform: uppercase; color: #e8000d; margin: 0 0 32px; letter-spacing: -0.02em; line-height: 1.05;">You're on<br>the list.</h1>

            <!-- CHIC BODY COPY — italic, lighter weight, elegant -->
            <p style="font-size: 16px; font-style: italic; font-weight: 400; line-height: 1.9; color: #1a1a1a; margin: 0 0 16px; letter-spacing: 0.01em;">
              We're putting the finishing touches on IvoryClause — attorney-reviewed contracts built for wedding professionals.
            </p>

            <p style="font-size: 13px; font-weight: 400; line-height: 1.8; color: rgba(26,26,26,0.65); margin: 0 0 32px; letter-spacing: 0.06em; text-transform: uppercase;">
              Fully customizable &nbsp;·&nbsp; $19.99 &nbsp;·&nbsp; Instant delivery
            </p>

            <p style="font-size: 15px; font-weight: 400; line-height: 1.8; color: #1a1a1a; margin: 0 0 40px;">
              You'll be the first to know when we go live.
            </p>

            <!-- DIVIDER -->
            <div style="border-top: 1px solid rgba(26,26,26,0.12); padding-top: 28px;">
              <p style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(26,26,26,0.4); line-height: 1.9; margin: 0;">
                IvoryClause &nbsp;·&nbsp; <a href="https://ivoryclause.com" style="color: rgba(26,26,26,0.4); text-decoration: none;">ivoryclause.com</a><br>
                We did the legal homework so you don't have to.
              </p>
            </div>

          </div>
        </div>
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
