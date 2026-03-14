const stripe = require(‘stripe’)(process.env.STRIPE_SECRET_KEY);
const { Resend } = require(‘resend’);

const resend = new Resend(process.env.RESEND_API_KEY);

// ── CONTRACT TEMPLATE ──────────────────────────────────────────
function buildContractHTML(formData) {
const f = formData;

// Format wedding date nicely
const weddingDate = f.weddingDate
? new Date(f.weddingDate + ‘T00:00:00’).toLocaleDateString(‘en-US’, {
weekday: ‘long’, year: ‘numeric’, month: ‘long’, day: ‘numeric’
})
: ‘_______________’;

// Format ceremony time
const ceremonyTime = f.ceremonyHour && f.ceremonyMin
? `${f.ceremonyHour}:${f.ceremonyMin} ${f.ceremonyAmPm}`
: ‘_______________’;

// Format engagement session time
const engagementTime = f.engagementHour && f.engagementMin
? `${f.engagementHour}:${f.engagementMin} ${f.engagementAmPm}`
: ‘_______________’;

return `<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

- { box-sizing: border-box; margin: 0; padding: 0; }

body {
font-family: ‘DM Sans’, Arial, sans-serif;
font-size: 10.5pt;
color: #1a1a1a;
background: #fff;
padding: 72px 80px;
line-height: 1.7;
}

.contract-header {
border-bottom: 2px solid #1a1a1a;
padding-bottom: 24px;
margin-bottom: 36px;
}

.brand {
font-size: 9pt;
letter-spacing: 0.2em;
text-transform: uppercase;
color: #ff4500;
margin-bottom: 8px;
font-weight: 500;
}

h1 {
font-size: 22pt;
font-weight: 500;
letter-spacing: 0.02em;
text-transform: uppercase;
color: #1a1a1a;
line-height: 1.1;
}

.contract-date {
font-size: 9pt;
color: #666;
margin-top: 8px;
letter-spacing: 0.05em;
}

.section {
margin-bottom: 28px;
}

.section-title {
font-size: 8pt;
font-weight: 500;
letter-spacing: 0.22em;
text-transform: uppercase;
color: #ff4500;
margin-bottom: 14px;
padding-bottom: 6px;
border-bottom: 1px solid #eee;
}

.field-grid {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 12px 32px;
}

.field {
margin-bottom: 10px;
}

.field-label {
font-size: 7.5pt;
font-weight: 500;
letter-spacing: 0.1em;
text-transform: uppercase;
color: #999;
margin-bottom: 2px;
}

.field-value {
font-size: 10.5pt;
color: #1a1a1a;
font-weight: 400;
border-bottom: 1px solid #ddd;
padding-bottom: 3px;
min-height: 20px;
}

.clause {
margin-bottom: 18px;
}

.clause-title {
font-size: 9pt;
font-weight: 500;
letter-spacing: 0.08em;
text-transform: uppercase;
color: #1a1a1a;
margin-bottom: 6px;
}

.clause p {
font-size: 10pt;
line-height: 1.75;
color: #1a1a1a;
}

.signature-block {
margin-top: 48px;
display: grid;
grid-template-columns: 1fr 1fr;
gap: 48px;
}

.sig-party .sig-label {
font-size: 8pt;
letter-spacing: 0.12em;
text-transform: uppercase;
color: #999;
margin-bottom: 6px;
}

.sig-line {
border-bottom: 1px solid #1a1a1a;
height: 40px;
margin-bottom: 6px;
}

.sig-name {
font-size: 9pt;
color: #666;
}

.disclaimer {
margin-top: 48px;
padding-top: 18px;
border-top: 1px solid #eee;
font-size: 7.5pt;
color: #aaa;
line-height: 1.6;
}

.highlight {
background: #fff8f5;
border-left: 3px solid #ff4500;
padding: 10px 16px;
margin: 12px 0;
font-size: 10pt;
}
</style>

</head>
<body>

<div class="contract-header">
  <div class="brand">IvoryClause — Contract Studio</div>
  <h1>Photography Services Agreement</h1>
  <div class="contract-date">Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
</div>

<!-- PARTIES -->

<div class="section">
  <div class="section-title">01 — The Parties</div>
  <div class="field-grid">
    <div class="field">
      <div class="field-label">Photographer / Service Provider</div>
      <div class="field-value">${f.photographerName || ''}</div>
    </div>
    <div class="field">
      <div class="field-label">Business Name</div>
      <div class="field-value">${f.businessName || 'N/A'}</div>
    </div>
    <div class="field">
      <div class="field-label">Photographer Email</div>
      <div class="field-value">${f.photographerEmail || ''}</div>
    </div>
    <div class="field">
      <div class="field-label">Business Address</div>
      <div class="field-value">${f.address || ''}</div>
    </div>
    <div class="field">
      <div class="field-label">Governing State</div>
      <div class="field-value">${f.state || ''}</div>
    </div>
  </div>
</div>

<div class="section">
  <div class="section-title">02 — The Client</div>
  <div class="field-grid">
    <div class="field">
      <div class="field-label">Client 1</div>
      <div class="field-value">${f.client1Name || ''}</div>
    </div>
    <div class="field">
      <div class="field-label">Client 2</div>
      <div class="field-value">${f.client2Name || 'N/A'}</div>
    </div>
    <div class="field">
      <div class="field-label">Client Email</div>
      <div class="field-value">${f.clientEmail || ''}</div>
    </div>
  </div>
</div>

<!-- EVENT DETAILS -->

<div class="section">
  <div class="section-title">03 — Event Details</div>
  <div class="field-grid">
    <div class="field">
      <div class="field-label">Wedding Date</div>
      <div class="field-value">${weddingDate}</div>
    </div>
    <div class="field">
      <div class="field-label">Ceremony Start Time</div>
      <div class="field-value">${ceremonyTime}</div>
    </div>
    <div class="field">
      <div class="field-label">Venue Name</div>
      <div class="field-value">${f.venueName || ''}</div>
    </div>
    <div class="field">
      <div class="field-label">Venue Address</div>
      <div class="field-value">${f.venueAddress || ''}</div>
    </div>
  </div>
</div>

<!-- SERVICES -->

<div class="section">
  <div class="section-title">04 — Services & Deliverables</div>

  <div class="clause">
    <div class="clause-title">Coverage</div>
    <p>Photographer agrees to provide photography coverage for <strong>${f.coverageHours || '___'} hours</strong> on the wedding date. Services included: <strong>${f.servicesIncluded || '___'}</strong>.</p>
  </div>

  <div class="clause">
    <div class="clause-title">Second Shooter</div>
    <p>A second shooter is <strong>${f.secondShooter === 'yes' ? 'included' : 'not included'}</strong> in this agreement.</p>
  </div>

${f.engagementIncluded === ‘yes’ ? `

  <div class="clause">
    <div class="clause-title">Engagement Session</div>
    <p>An engagement session is included. Scheduled date: <strong>${f.engagementDate || '___'}</strong> at <strong>${engagementTime}</strong>, location: <strong>${f.engagementLocation || '___'}</strong>.</p>
  </div>
  ` : `
  <div class="clause">
    <div class="clause-title">Engagement Session</div>
    <p>An engagement session is not included in this agreement.</p>
  </div>
  `}

  <div class="clause">
    <div class="clause-title">Deliverables</div>
    <p>Client will receive a minimum of <strong>${f.editedImages || '___'} edited images</strong>, delivered within <strong>${f.deliveryTimeframe || '___'} weeks</strong> via <strong>${f.deliveryMethod || '___'}</strong>.</p>
  </div>

  <div class="clause">
    <div class="clause-title">Portrait Time</div>
    <p>Wedding party photos: approximately <strong>${f.weddingPartyMinutes || '___'} minutes</strong>. Family formal photos: approximately <strong>${f.familyFormalMinutes || '___'} minutes</strong>.</p>
  </div>

  <div class="clause">
    <div class="clause-title">Raw Files</div>
    <p>Raw/unedited files are <strong>${f.rawFiles === 'provided' ? 'included and will be provided to the client' : 'not included in this agreement'}</strong>.</p>
  </div>
</div>

<!-- PAYMENT -->

<div class="section">
  <div class="section-title">05 — Payment Terms</div>

  <div class="highlight">
    <strong>Retainer:</strong> $${f.retainerAmount || '___'} &nbsp;|&nbsp;
    <strong>Remaining Balance:</strong> $${f.remainingBalance || '___'} &nbsp;|&nbsp;
    <strong>Total:</strong> $${f.totalPrice || '___'}
  </div>

  <div class="clause">
    <p>A non-refundable retainer of <strong>$${f.retainerAmount || '___'}</strong> is due upon signing this agreement to secure the date. The remaining balance of <strong>$${f.remainingBalance || '___'}</strong> is due no later than <strong>${f.balanceDueDays || '___'} days</strong> before the wedding date. Failure to pay the remaining balance by the due date may result in cancellation of services.</p>
  </div>
</div>

<!-- CANCELLATION -->

<div class="section">
  <div class="section-title">06 — Cancellation Policy</div>

  <div class="clause">
    <p>If the Client cancels within <strong>${f.lateCancelWindow || '___'} days</strong> of the wedding date, a cancellation fee of <strong>${f.lateCancelFee || '___'}%</strong> of the total contract value will be charged in addition to the non-refundable retainer.</p>
  </div>

  <div class="clause">
    <div class="clause-title">Force Majeure</div>
    <p>In the event of cancellation due to circumstances beyond either party's control (including but not limited to natural disasters, acts of government, or public health emergencies), the retainer will be <strong>${f.forceMajeure === 'refund' ? 'refunded in full' : 'applied as a credit toward a rescheduled date'}</strong>.</p>
  </div>
</div>

<!-- TRAVEL -->

<div class="section">
  <div class="section-title">07 — Travel</div>

  <div class="clause">
    <p>Travel within <strong>${f.travelThreshold || '___'} miles</strong> of the Photographer's business address is included at no additional charge. Beyond this distance, travel fees apply at ${f.travelFeeType === 'per-mile' ? `<strong>$${f.perMileRate || '___'} per mile</strong>` : `a flat fee of <strong>$${f.flatFeeAmount || '___'}</strong>`}. Travel costs are the responsibility of the <strong>${f.travelCostsPaidBy === 'client' ? 'Client' : 'Photographer'}</strong>.</p>
  </div>
</div>

<!-- IMAGE RIGHTS -->

<div class="section">
  <div class="section-title">08 — Image Rights & Portfolio Use</div>

  <div class="clause">
    <p>The Photographer retains the copyright to all images produced under this agreement. The Client is granted a personal, non-commercial license to use the delivered images. The Photographer ${f.portfolioUse === 'without-consent' ? 'may use images from this event for portfolio, marketing, and promotional purposes without additional consent from the Client' : 'requires written consent from the Client before using any images from this event for portfolio or promotional purposes'}.</p>
  </div>
</div>

<!-- GENERAL CLAUSES -->

<div class="section">
  <div class="section-title">09 — General Terms</div>

  <div class="clause">
    <div class="clause-title">Governing Law</div>
    <p>This Agreement shall be governed by and construed in accordance with the laws of the State of <strong>${f.state || '___'}</strong>. Any disputes arising under this Agreement shall be resolved in the courts of <strong>${f.state || '___'}</strong>.</p>
  </div>

  <div class="clause">
    <div class="clause-title">Entire Agreement</div>
    <p>This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior negotiations, representations, warranties, and understandings of the parties.</p>
  </div>

  <div class="clause">
    <div class="clause-title">Amendments</div>
    <p>No amendment or modification of this Agreement shall be valid unless made in writing and signed by both parties.</p>
  </div>

  <div class="clause">
    <div class="clause-title">Severability</div>
    <p>If any provision of this Agreement is found to be unenforceable, the remaining provisions shall continue in full force and effect.</p>
  </div>
</div>

<!-- SIGNATURES -->

<div class="signature-block">
  <div class="sig-party">
    <div class="sig-label">Photographer Signature</div>
    <div class="sig-line"></div>
    <div class="sig-name">${f.photographerName || ''} &nbsp;|&nbsp; Date: _______________</div>
  </div>
  <div class="sig-party">
    <div class="sig-label">Client Signature</div>
    <div class="sig-line"></div>
    <div class="sig-name">${f.client1Name || ''} &nbsp;|&nbsp; Date: _______________</div>
  </div>
</div>

<div class="disclaimer">
  This contract was generated via IvoryClause (ivoryclause.com). IvoryClause is a document generation platform and is not a party to this Agreement. IvoryClause does not provide legal advice, does not represent either party, and is not responsible for the enforcement, validity, or outcome of any agreement entered into using this template. Users are encouraged to consult a licensed attorney before signing.
</div>

</body>
</html>`;
}

// ── MAIN HANDLER ───────────────────────────────────────────────
exports.handler = async (event) => {
if (event.httpMethod !== ‘POST’) {
return { statusCode: 405, body: ‘Method Not Allowed’ };
}

const sig = event.headers[‘stripe-signature’];

let stripeEvent;
try {
stripeEvent = stripe.webhooks.constructEvent(
event.body,
sig,
process.env.STRIPE_WEBHOOK_SECRET
);
} catch (err) {
console.error(‘Webhook signature error:’, err.message);
return { statusCode: 400, body: `Webhook Error: ${err.message}` };
}

if (stripeEvent.type !== ‘checkout.session.completed’) {
return { statusCode: 200, body: ‘Event ignored’ };
}

const session = stripeEvent.data.object;
const { contractType, formData: formDataJSON } = session.metadata;
const customerEmail = session.customer_details?.email;
const formData = JSON.parse(formDataJSON);

try {
// 1. Build HTML contract
const contractHTML = buildContractHTML(formData);

```
// 2. Generate PDF via Browserless
const browserlessResponse = await fetch(
  `https://chrome.browserless.io/pdf?token=${process.env.BROWSERLESS_API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      html: contractHTML,
      options: {
        printBackground: true,
        format: 'Letter',
        margin: { top: '0', bottom: '0', left: '0', right: '0' },
      },
    }),
  }
);

if (!browserlessResponse.ok) {
  throw new Error(`Browserless error: ${browserlessResponse.status}`);
}

const pdfBuffer = await browserlessResponse.arrayBuffer();
const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');

// 3. Send email with PDF via Resend
await resend.emails.send({
  from: 'IvoryClause <contracts@ivoryclause.com>',
  to: customerEmail,
  subject: 'Your IvoryClause Photographer Contract is Ready',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #1a1a1a; padding: 32px; text-align: center;">
        <span style="font-size: 20px; letter-spacing: 0.1em; text-transform: uppercase; color: #f5f0e8;">IVORYCLAUSE</span>
      </div>
      <div style="padding: 40px 32px;">
        <h1 style="font-size: 22px; font-weight: 500; margin-bottom: 16px;">Your contract is ready.</h1>
        <p style="font-size: 15px; line-height: 1.7; color: #444; margin-bottom: 24px;">
          Your personalized Photographer Services Agreement is attached to this email as a PDF. 
          Review it carefully, then send it to your client for signatures.
        </p>
        <p style="font-size: 13px; line-height: 1.7; color: #888; margin-bottom: 32px;">
          Remember — have both parties sign before any work begins. 
          Keep a signed copy for your records.
        </p>
        <div style="border-top: 1px solid #eee; padding-top: 24px; font-size: 11px; color: #bbb; line-height: 1.6;">
          IvoryClause is a document generation platform and does not provide legal advice. 
          Consult a licensed attorney if you have questions about your contract.
        </div>
      </div>
    </div>
  `,
  attachments: [
    {
      filename: 'IvoryClause-Photographer-Contract.pdf',
      content: pdfBase64,
    },
  ],
});

console.log(`Contract sent to ${customerEmail}`);
return { statusCode: 200, body: 'Success' };
```

} catch (error) {
console.error(‘Error generating/sending contract:’, error);
return { statusCode: 500, body: error.message };
}
};