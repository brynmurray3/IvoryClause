const { Resend } = require(‘resend’);
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
if (event.httpMethod !== ‘POST’) {
return { statusCode: 405, body: ‘Method Not Allowed’ };
}

let email;
try {
const body = JSON.parse(event.body);
email = body.email;
} catch (e) {
return { statusCode: 400, body: ‘Invalid request’ };
}

if (!email || !email.includes(’@’)) {
return { statusCode: 400, body: ‘Invalid email’ };
}

try {
// Send confirmation to the person who signed up
await resend.emails.send({
from: ‘IvoryClause [hello@ivoryclause.com](mailto:hello@ivoryclause.com)’,
to: email,
subject: ‘You're on the list.’,
html: `<div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;"> <div style="background: #1a1a1a; padding: 32px; text-align: center;"> <span style="font-family: Arial, sans-serif; font-size: 18px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; color: #f5f0e8;">IVORYCLAUSE</span> </div> <div style="padding: 48px 32px;"> <h1 style="font-size: 28px; font-weight: 900; text-transform: uppercase; color: #e8000d; margin: 0 0 20px; letter-spacing: -0.02em; line-height: 1;">You're on<br>the list.</h1> <p style="font-size: 15px; line-height: 1.8; color: #1a1a1a; margin: 0 0 16px;">We're putting the finishing touches on IvoryClause — attorney-reviewed contracts built for wedding professionals. Fully customizable. $19.99.</p> <p style="font-size: 15px; line-height: 1.8; color: #1a1a1a; margin: 0 0 32px;">You'll be the first to know when we go live. We'll have something special waiting for you.</p> <div style="border-top: 1px solid rgba(26,26,26,0.1); padding-top: 24px;"> <p style="font-size: 12px; color: rgba(26,26,26,0.45); line-height: 1.6; margin: 0;">IvoryClause · ivoryclause.com<br>We did the legal homework so you don't have to.</p> </div> </div> </div>`
});

```
// Send internal notification to yourself
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
```

} catch (error) {
console.error(‘Error sending email:’, error);
return { statusCode: 500, body: error.message };
}
};