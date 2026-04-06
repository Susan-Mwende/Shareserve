# M-Pesa Daraja API Setup Guide

## 🚀 Getting Daraja API Credentials

### Step 1: Create Daraja Account
1. Visit [https://developer.safaricom.co.ke](https://developer.safaricom.co.ke)
2. Click "Sign Up" or "Login"
3. Create a developer account or login with existing credentials

### Step 2: Create a New App
1. After login, click "My Apps" in the dashboard
2. Click "Add New App"
3. Fill in app details:
   - **App Name**: ShareServe Donations
   - **Description**: Donation platform for ShareServe International
   - **Callback URL**: `https://yourdomain.com/api/mpesa/callback` (production)
   - **Test Callback URL**: `http://localhost:5000/api/mpesa/callback` (development)

### Step 3: Configure M-Pesa Services
1. In your app dashboard, click "Add Service"
2. Select "M-Pesa API"
3. Choose the following services:
   - **STK Push** (for instant payment prompts)
   - **C2B** (for paybill payments)
   - **B2C** (for send money)

### Step 4: Get Your Credentials
1. In your app dashboard, go to "Credentials"
2. You will find:
   - **Consumer Key**: Your app's consumer key
   - **Consumer Secret**: Your app's consumer secret
   - **Passkey**: For STK Push transactions
   - **Shortcode**: Your business short code (174379 for sandbox)

### Step 5: Update Configuration
1. Open `c:\ShareServe\server\config\mpesa.js`
2. Replace the placeholder values:
   ```javascript
   export const MPESA_CONFIG = {
     consumerKey: 'YOUR_ACTUAL_CONSUMER_KEY',
     consumerSecret: 'YOUR_ACTUAL_CONSUMER_SECRET',
     shortCode: '174379', // Sandbox default
     passKey: 'YOUR_ACTUAL_PASSKEY',
     // ... other config
   };
   ```

### Step 6: Test the Integration
1. Restart the server: `node server.js`
2. Test the STK Push endpoint
3. Verify callback handling

## 🧪 Sandbox vs Production

### Sandbox Environment (Testing)
- **Environment**: `sandbox`
- **Shortcode**: `174379` (default)
- **Passkey**: `bfb279c9a9ffb0349b9d9b9b9b9b9b9b` (default)
- **Test Phone**: `254708374149`
- **No real money**: Test transactions only

### Production Environment (Live)
- **Environment**: `production`
- **Your actual shortcode**: Provided by Safaricom
- **Your actual passkey**: Provided by Safaricom
- **Real transactions**: Actual money transfers
- **SSL required**: HTTPS callback URLs

## 🔧 Configuration Details

### Required Credentials
```javascript
const MPESA_CONFIG = {
  consumerKey: 'YOUR_CONSUMER_KEY',        // From Daraja dashboard
  consumerSecret: 'YOUR_CONSUMER_SECRET',    // From Daraja dashboard
  shortCode: '174379',                      // Sandbox default
  passKey: 'YOUR_PASSKEY',                  // From Daraja dashboard
  environment: 'sandbox',                   // 'sandbox' or 'production'
  callbackUrl: 'http://localhost:5000/api/mpesa/callback'
};
```

### Important Notes
1. **Test Mode**: Set `TEST_MODE = true` for development
2. **Callbacks**: Must be publicly accessible in production
3. **Security**: Never commit real credentials to version control
4. **SSL**: Production requires HTTPS for callback URLs

## 🚀 Production Deployment Checklist

### Before Going Live
- [ ] Get real Daraja credentials
- [ ] Set up HTTPS for callback URLs
- [ ] Update environment to 'production'
- [ ] Set TEST_MODE to false
- [ ] Test with real M-Pesa transactions
- [ ] Set up proper error handling
- [ ] Configure logging and monitoring

### Security Best Practices
- [ ] Store credentials in environment variables
- [ ] Use HTTPS for all API calls
- [ ] Implement proper error handling
- [ ] Add rate limiting
- [ ] Log all transactions
- [ ] Monitor for suspicious activity

## 📞 Support

### Daraja Documentation
- [Official Documentation](https://developer.safaricom.co.ke/docs)
- [API Reference](https://developer.safaricom.co.ke/api)
- [Support Portal](https://developer.safaricom.co.ke/support)

### Common Issues
1. **Invalid Credentials**: Check consumer key/secret
2. **Callback Timeout**: Ensure callback URL is accessible
3. **Invalid Passkey**: Verify passkey matches shortcode
4. **Network Issues**: Check internet connectivity
5. **SSL Errors**: Use HTTPS for production

## 🧪 Testing Checklist

### Sandbox Testing
- [ ] OAuth token generation works
- [ ] STK Push request succeeds
- [ ] Callback URL receives responses
- [ ] Payment status updates correctly
- [ ] Error handling works properly

### Production Testing
- [ ] Real credentials work
- [ ] HTTPS callbacks work
- [ ] Real transactions process
- [ ] Receipt numbers generated
- [ ] Database records updated

---

**Ready to integrate with M-Pesa Daraja API! 🚀**
