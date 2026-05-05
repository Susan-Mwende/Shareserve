import React, { createContext, useContext, useState, useEffect } from 'react';

const PaystackContext = createContext();

export const usePaystack = () => {
  const context = useContext(PaystackContext);
  if (!context) {
    throw new Error('usePaystack must be used within a PaystackProvider');
  }
  return context;
};

export const PaystackProvider = ({ children }) => {
  const [paystack, setPaystack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load Paystack script
  useEffect(() => {
    const loadPaystack = () => {
      return new Promise((resolve, reject) => {
        console.log('🔄 Starting to load Paystack script...');
        
        // Check if Paystack is already loaded
        if (window.Paystack) {
          console.log('✅ Paystack already loaded');
          resolve(window.Paystack);
          return;
        }

        // Create script element with better error handling
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js'; // Use Paystack CDN directly
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.referrerPolicy = 'no-referrer-when-downgrade';
        script.type = 'text/javascript';
        
        console.log('📡 Script element created, src:', script.src);
        
        // Set timeout for script loading
        const timeout = setTimeout(() => {
          reject(new Error('Paystack script loading timeout'));
        }, 15000);

        script.onload = () => {
          clearTimeout(timeout);
          console.log('📥 Script loaded successfully');
          // Give a small delay for script to fully initialize
          setTimeout(() => {
            console.log('🔍 Checking Paystack initialization...');
            console.log('window.Paystack:', window.Paystack);
            console.log('typeof window.Paystack.setup:', typeof window.Paystack.setup);
            
            if (window.Paystack && typeof window.Paystack.setup === 'function') {
              console.log('✅ Paystack properly initialized');
              resolve(window.Paystack);
            } else {
              console.error('❌ Paystack loaded but not properly initialized');
              reject(new Error('Paystack loaded but not properly initialized'));
            }
          }, 200);
        };

        script.onerror = (event) => {
          clearTimeout(timeout);
          console.error('❌ Script loading error:', event);
          reject(new Error('Failed to load Paystack script'));
        };

        // Fallback: Try alternative loading method
        script.onabort = () => {
          clearTimeout(timeout);
          reject(new Error('Paystack script loading was aborted'));
        };

        // Add to document head
        document.head.appendChild(script);
      });
    };

    const initializePaystack = async () => {
      try {
        console.log('🚀 Initializing Paystack...');
        const paystackInstance = await loadPaystack();
        console.log('✅ Paystack loaded successfully:', paystackInstance);
        setPaystack(paystackInstance);
        setError(null);
      } catch (err) {
        console.error('❌ Failed to initialize Paystack:', err);
        setError(err.message);
        // Try to load again after delay
        setTimeout(() => {
          console.log('🔄 Attempting to reload Paystack...');
          loadPaystack().then(resolve => {
            console.log('✅ Paystack reload successful');
            setPaystack(resolve);
            setError(null);
          }).catch(() => {
            console.log('❌ Retry failed, keeping error state');
          });
        }, 5000);
      } finally {
        setLoading(false);
      }
    };

    initializePaystack();
  }, []);

  const initializeTransaction = async (amount, email, metadata = {}) => {
    try {
      const response = await fetch('/api/paystack/initialize-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          email,
          metadata,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to initialize transaction');
      }

      return data;
    } catch (err) {
      console.error('Error initializing Paystack transaction:', err);
      throw err;
    }
  };

  const verifyTransaction = async (reference) => {
    try {
      const response = await fetch(`/api/paystack/verify-transaction/${reference}`);

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to verify transaction');
      }

      return data;
    } catch (err) {
      console.error('Error verifying Paystack transaction:', err);
      throw err;
    }
  };

  const processPayment = async (paymentData, onSuccess, onError) => {
    console.log('🔍 Paystack processPayment called with:', paymentData);
    
    if (!paystack) {
      console.error('❌ Paystack not initialized');
      throw new Error('Paystack not initialized');
    }

    try {
      console.log('🚀 Initializing transaction...');
      // Initialize transaction with backend
      const { authorization_url, reference } = await initializeTransaction(
        paymentData.amount,
        paymentData.email,
        paymentData.metadata
      );

      console.log('✅ Transaction initialized:', { authorization_url, reference });

      // Open Paystack popup
      const handler = paystack.setup({
        key: 'pk_test_fc30ee1c02db28f8fee4bdec208e993e00a64f2b', // Replace with your actual key
        email: paymentData.email,
        amount: paymentData.amount * 100, // Convert to kobo
        currency: 'KES',
        reference: reference,
        metadata: paymentData.metadata,
        callback: async (response) => {
          console.log('🔄 Paystack callback received:', response);
          try {
            // Verify transaction with backend
            const verification = await verifyTransaction(response.reference);
            console.log('✅ Transaction verified:', verification);
            
            if (verification.status === 'success') {
              onSuccess({
                ...response,
                verification: verification.data,
              });
            } else {
              onError('Payment verification failed');
            }
          } catch (err) {
            console.error('❌ Verification error:', err);
            onError(err.message);
          }
        },
        onClose: () => {
          console.log('❌ Paystack popup closed');
          onError('Payment window was closed');
        },
      });

      console.log('🎯 Opening Paystack popup...');
      handler.openIframe();
    } catch (err) {
      console.error('❌ Error processing Paystack payment:', err);
      throw err;
    }
  };

  const value = {
    paystack,
    loading,
    error,
    initializeTransaction,
    verifyTransaction,
    processPayment,
  };

  // Allow children to render even with errors for better UX
  if (loading) {
    return (
      <PaystackContext.Provider value={value}>
        {children}
      </PaystackContext.Provider>
    );
  }

  return (
    <PaystackContext.Provider value={value}>
      {children}
    </PaystackContext.Provider>
  );
};

export default PaystackContext;
