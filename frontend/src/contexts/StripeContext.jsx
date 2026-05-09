import React, { createContext, useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const StripeContext = createContext();

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripe must be used within a StripeProvider');
  }
  return context;
};

export const StripeProvider = ({ children }) => {
  const [stripe, setStripe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize Stripe
  React.useEffect(() => {
    const initializeStripe = async () => {
      try {
        // Use your publishable key - for production, use your live key
        const stripeInstance = await loadStripe('pk_test_REPLACE_WITH_YOUR_ACTUAL_PUBLISHABLE_KEY'); // Replace with your actual key
        setStripe(stripeInstance);
      } catch (err) {
        console.error('Failed to initialize Stripe:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeStripe();
  }, []);

  const createPaymentIntent = async (amount, currency = 'usd', metadata = {}) => {
    if (!stripe) {
      throw new Error('Stripe not initialized');
    }

    try {
      const response = await fetch('/api/payment/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          metadata,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to create payment intent');
      }

      return data;
    } catch (err) {
      console.error('Error creating payment intent:', err);
      throw err;
    }
  };

  const confirmPayment = async (paymentIntentId) => {
    try {
      const response = await fetch('/api/payment/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to confirm payment');
      }

      return data;
    } catch (err) {
      console.error('Error confirming payment:', err);
      throw err;
    }
  };

  const getPaymentDetails = async (paymentIntentId) => {
    try {
      const response = await fetch(`/api/payment/payment/${paymentIntentId}`);

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to retrieve payment details');
      }

      return data;
    } catch (err) {
      console.error('Error retrieving payment details:', err);
      throw err;
    }
  };

  const value = {
    stripe,
    loading,
    error,
    createPaymentIntent,
    confirmPayment,
    getPaymentDetails,
  };

  if (loading) {
    return <div>Loading payment system...</div>;
  }

  if (error) {
    return <div>Error loading payment system: {error}</div>;
  }

  if (!stripe) {
    return <div>Payment system unavailable</div>;
  }

  return (
    <StripeContext.Provider value={value}>
      <Elements stripe={stripe}>
        {children}
      </Elements>
    </StripeContext.Provider>
  );
};

export default StripeContext;
