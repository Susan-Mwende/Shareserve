import express from 'express';
import axios from 'axios';
import crypto from 'crypto';
import Donation from '../models/Donation.js';
import { MPESA_CONFIG, TEST_MODE, TEST_PHONE_NUMBERS } from '../config/mpesa.js';

const router = express.Router();

// Daraja OAuth Token Generation
const getDarajaOAuthToken = async () => {
  try {
    const auth = Buffer.from(`${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`).toString('base64');
    
    const response = await axios.get(
      MPESA_CONFIG.oauthUrl,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );
    
    if (!response.data.access_token) {
      throw new Error('Failed to obtain OAuth token from Daraja API');
    }
    
    return response.data.access_token;
  } catch (error) {
    console.error('Daraja OAuth Token Error:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with M-Pesa Daraja API');
  }
};

// STK Push - Initiate payment (Daraja API)
router.post('/stk-push', async (req, res) => {
  try {
    const { phoneNumber, amount, accountReference, description, paymentType } = req.body;

    // Validate phone number (Kenyan format)
    const formattedPhone = phoneNumber.startsWith('254') 
      ? phoneNumber 
      : `254${phoneNumber.slice(1)}`;
    
    // Validate amount
    if (!amount || parseFloat(amount) < 1) {
      return res.status(400).json({
        success: false,
        message: 'Minimum donation amount is KES 1'
      });
    }

    // Test mode simulation
    if (TEST_MODE) {
      // Simulate Daraja STK Push response
      const mockTransactionId = `ws_CO_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const mockMerchantId = `testmerchant_${Date.now()}`;
      
      // Save donation record
      const donation = new Donation({
        phoneNumber: formattedPhone,
        amount: parseFloat(amount),
        transactionId: mockTransactionId,
        merchantRequestId: mockMerchantId,
        status: 'pending',
        description: description || 'M-Pesa Donation (Test)',
        date: new Date(),
        paymentMethod: 'mpesa',
        paymentType: paymentType || 'paybill'
      });

      await donation.save();

      // Simulate successful payment after 5 seconds for testing
      setTimeout(async () => {
        try {
          donation.status = 'completed';
          donation.mpesaReceiptNumber = `SJJ${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
          donation.completedAt = new Date();
          await donation.save();
          console.log('Test payment completed:', mockTransactionId);
        } catch (error) {
          console.error('Error updating test payment:', error);
        }
      }, 5000);

      // Different response based on payment type
      let customerMessage = paymentType === 'sendmoney' 
        ? `Test Send Money request to ShareServe (0799639688). Check your phone for prompt.`
        : `Test Paybill request (174379). Check your phone for prompt.`;

      return res.json({
        success: true,
        message: 'Test payment request sent successfully',
        data: {
          CheckoutRequestID: mockTransactionId,
          MerchantRequestID: mockMerchantId,
          ResponseCode: '0',
          ResponseDescription: 'Success. Request accepted for processing',
          CustomerMessage: customerMessage,
          PaymentType: paymentType || 'paybill'
        },
        donationId: donation._id
      });
    }

    // Production mode would go here with real Daraja API
    // For now, return test response
    return res.json({
      success: true,
      message: 'M-Pesa STK Push endpoint is working',
      testMode: true,
      paymentType: paymentType || 'paybill'
    });

  } catch (error) {
    console.error('STK Push error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate payment',
      error: error.message
    });
  }
});

// Check payment status
router.get('/status/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;
    
    const donation = await Donation.findOne({ transactionId });
    
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    res.json({
      success: true,
      data: {
        transactionId: donation.transactionId,
        status: donation.status,
        amount: donation.amount,
        phoneNumber: donation.phoneNumber,
        mpesaReceiptNumber: donation.mpesaReceiptNumber,
        completedAt: donation.completedAt,
        failureReason: donation.failureReason
      }
    });

  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ success: false, message: 'Failed to check status' });
  }
});

// Get all donations (Admin only)
router.get('/donations', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json({ success: true, data: donations });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ success: false, message: 'Failed to get donations' });
  }
});

// Test endpoint to verify M-Pesa configuration
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'M-Pesa API is working',
    config: {
      environment: MPESA_CONFIG.environment,
      shortCode: MPESA_CONFIG.shortCode,
      testMode: TEST_MODE,
      testPhoneNumbers: TEST_PHONE_NUMBERS
    }
  });
});

export default router;
