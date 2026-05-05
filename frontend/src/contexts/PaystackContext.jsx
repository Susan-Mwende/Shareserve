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
        // Check if Paystack is already loaded
        if (window.Paystack) {
          resolve(window.Paystack);
          return;
        }

        // Create script element with better error handling
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        script.crossOrigin = 'anonymous';
        
        // Set timeout for script loading
        const timeout = setTimeout(() => {
          reject(new Error('Paystack script loading timeout'));
        }, 10000);

        script.onload = () => {
          clearTimeout(timeout);
          // Give a small delay for the script to fully initialize
          setTimeout(() => {
            if (window.Paystack && typeof window.Paystack.setup === 'function') {
              resolve(window.Paystack);
            } else {
              reject(new Error('Paystack loaded but not properly initialized'));
            }
          }, 100);
        };

        script.onerror = (event) => {
          clearTimeout(timeout);
          console.error('Script loading error:', event);
          reject(new Error('Failed to load Paystack script'));
        };

        // Add to document head
        document.head.appendChild(script);
      });
    };

    const initializePaystack = async () => {
      try {
        const paystackInstance = await loadPaystack();
        setPaystack(paystackInstance);
        setError(null);
      } catch (err) {
        console.error('Failed to initialize Paystack:', err);
        setError(err.message);
        // Don't set paystack to null, keep trying or provide fallback
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
    if (!paystack) {
      throw new Error('Paystack not initialized');
    }

    try {
      // Initialize transaction with backend
      const { authorization_url, reference } = await initializeTransaction(
        paymentData.amount,
        paymentData.email,
        paymentData.metadata
      );

      // Open Paystack popup
      const handler = paystack.setup({
        key: 'pk_test_REPLACE_WITH_YOUR_PAYSTACK_PUBLIC_KEY', // Replace with your actual key
        email: paymentData.email,
        amount: paymentData.amount * 100, // Convert to kobo
        currency: 'KES',
        reference: reference,
        metadata: paymentData.metadata,
        callback: async (response) => {
          try {
            // Verify transaction with backend
            const verification = await verifyTransaction(response.reference);
            
            if (verification.status === 'success') {
              onSuccess({
                ...response,
                verification: verification.data,
              });
            } else {
              onError('Payment verification failed');
            }
          } catch (err) {
            onError(err.message);
          }
        },
        onClose: () => {
          onError('Payment window was closed');
        },
      });

      handler.openIframe();
    } catch (err) {
      console.error('Error processing Paystack payment:', err);
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
