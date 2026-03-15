const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { contractType, formData } = JSON.parse(event.body);

    // Stripe metadata values are limited to 500 chars — chunk the formData
    const str = JSON.stringify(formData);
    const size = 490;
    const total = Math.ceil(str.length / size);
    const metadata = { contractType, formData_chunks: String(total) };
    for (let i = 0; i < total; i++) {
      metadata['formData_' + i] = str.slice(i * size, (i + 1) * size);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'IvoryClause — Photographer Contract',
              description: 'Attorney-reviewed, personalized PDF contract. Delivered instantly to your email.',
            },
            unit_amount: 1999,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.URL}/success.html`,
      cancel_url: `${process.env.URL}/contract.html`,
      metadata,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };

  } catch (error) {
    console.error('Stripe error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
