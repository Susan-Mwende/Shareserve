import express from 'express';
import dotenv from 'dotenv';
import paystackLib from 'paystack';

dotenv.config();

const router = express.Router();

// Initialize Paystack
const paystack = paystackLib(process.env.PAYSTACK_SECRET_KEY);

// Initialize transaction
router.post('/initialize-transaction', async (req, res) => {
  console.log('🔍 Paystack initialize request:', req.body);
  
  try {
    const { amount, email, metadata = {} } = req.body;

    // Validate required fields
    if (!amount || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Amount and email are required' 
      });
    }

    // Convert amount to kobo (Paystack expects amounts in kobo)
    const amountInKobo = amount * 100;

    // Initialize transaction
    const response = await paystack.transaction.initialize({
      amount: amountInKobo,
      email: email,
      currency: 'KES', // Kenyan Shillings
      metadata: {
        ...metadata,
        source: 'shareserve-website',
        timestamp: new Date().toISOString()
      },
      callback_url: `${process.env.FRONTEND_URL}/donation-success`,
    });

    console.log('✅ Paystack response:', response.data);

    const responseData = {
      success: true,
      authorization_url: response.data.authorization_url,
      reference: response.data.reference,
      access_code: response.data.access_code,
    };

    console.log('📤 Sending response:', responseData);
    res.json(responseData);
  } catch (error) {
    console.error('Error initializing Paystack transaction:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to initialize transaction' 
    });
  }
});

// Verify transaction
router.get('/verify-transaction/:reference', async (req, res) => {
  try {
    const { reference } = req.params;

    if (!reference) {
      return res.status(400).json({ 
        success: false, 
        message: 'Transaction reference is required' 
      });
    }

    const response = await paystack.transaction.verify(reference);

    res.json({
      success: true,
      status: response.data.status,
      message: response.data.message,
      data: {
        reference: response.data.reference,
        amount: response.data.amount,
        currency: response.data.currency,
        status: response.data.status,
        paid_at: response.data.paid_at,
        metadata: response.data.metadata,
        customer: response.data.customer,
      },
    });
  } catch (error) {
    console.error('Error verifying Paystack transaction:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to verify transaction' 
    });
  }
});

// Get transaction details
router.get('/transaction/:reference', async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await paystack.transaction.get(reference);

    res.json({
      success: true,
      transaction: response.data,
    });
  } catch (error) {
    console.error('Error retrieving Paystack transaction:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve transaction details' 
    });
  }
});

// Webhook handler for Paystack events
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const event = JSON.parse(req.body.toString());
  
  // Verify webhook signature (optional but recommended)
  // const hash = crypto.createHmac('sha512', process.env.PAYSTACK_WEBHOOK_SECRET)
  //   .update(req.body.toString())
  //   .digest('hex');
  
  // if (hash !== req.headers['x-paystack-signature']) {
  //   return res.status(401).send('Unauthorized');
  // }

  console.log('Paystack webhook event received:', event);

  // Handle different event types
  switch (event.event) {
    case 'charge.success':
      const successfulCharge = event.data;
      console.log('Payment successful:', {
        reference: successfulCharge.reference,
        amount: successfulCharge.amount,
        customer: successfulCharge.customer,
        metadata: successfulCharge.metadata,
      });
      
      // Here you can:
      // 1. Update your database
      // 2. Send confirmation email
      // 3. Update user's donation history
      // 4. Send notification to admin
      
      break;
      
    case 'charge.failed':
      console.log('Payment failed:', event.data);
      break;
      
    case 'transfer.success':
      console.log('Transfer successful:', event.data);
      break;
      
    case 'transfer.failed':
      console.log('Transfer failed:', event.data);
      break;
      
    default:
      console.log(`Unhandled Paystack event: ${event.event}`);
  }

  // Always return 200 to acknowledge receipt
  res.status(200).send('Webhook received');
});

export default router;
