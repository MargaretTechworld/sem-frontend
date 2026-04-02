/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements, CardElement, useStripe, useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { FaLock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { API_URL } from '../../apiConfig';
import '../../styles/admin.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutForm = ({ course, student }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (!stripeError) {
      try {
        const { id } = paymentMethod;

        // 1. Create Payment Intent on Server
        const { data } = await axios.post(`${API_URL}/payment/create-payment-intent`, {
          items: [{ id: course._id, price: course.price }],
          email: student.email,
        });

        // 2. Confirm Payment with Stripe
        const confirmPayment = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: id,
        });

        if (confirmPayment.error) {
          setError(confirmPayment.error.message);
          setProcessing(false);
        } else {
          // 3. SECURELY SAVE ORDER ON SERVER (In real app, trigger from webhook too)
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${student.token}`,
            },
          };

          const orderData = {
            orderItems: [{
              title: course.title,
              qty: 1,
              image: course.image || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
              price: parseFloat(course.price.replace(/[^0-9.]/g, '')),
              course: course._id,
            }],
            paymentMethod: 'Stripe',
            totalPrice: parseFloat(course.price.replace(/[^0-9.]/g, '')),
            paymentResult: {
              id: confirmPayment.paymentIntent.id,
              status: confirmPayment.paymentIntent.status,
              update_time: new Date().toISOString(),
              email_address: student.email,
            },
            isPaid: true,
            paidAt: new Date(),
          };

          await axios.post(`${API_URL}/orders`, orderData, config);

          setSucceeded(true);
          setProcessing(false);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Transaction failed on server.');
        setProcessing(false);
      }
    } else {
      setError(stripeError.message);
      setProcessing(false);
    }
  };

  if (succeeded) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <FaCheckCircle style={{ fontSize: '4rem', color: '#10b981', marginBottom: '1rem' }} />
        <h2>Payment Successful!</h2>
        <p style={{ color: '#64748b' }}>
          We have sent the course details to
          <strong>{student.email}</strong>
          .
        </p>
        <p>Redirecting you back to home...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card" style={{ maxWidth: '600px', margin: '2rem auto', padding: '2.5rem' }}>
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FaLock style={{ color: '#3b82f6' }} />
          {' '}
          Secure Checkout
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>All transactions are encrypted and secure.</p>
      </div>

      <div style={{
        background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem',
      }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>
            Course:
            <strong>{course.title}</strong>
          </span>
          <strong>{course.price}</strong>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b',
        }}
        >
          <span>Student ID</span>
          <span>{student.email}</span>
        </div>
      </div>

      <div className="form-group">
        <label>Payment Card Information</label>
        <div style={{
          border: '2px solid #e2e8f0', padding: '1.25rem', borderRadius: '12px', background: '#fff',
        }}
        >
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
            },
          }}
          />
        </div>
      </div>

      {error && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginTop: '1.5rem', fontSize: '0.9rem',
        }}
        >
          <FaExclamationTriangle />
          {' '}
          {error}
        </div>
      )}

      <button
        type="submit"
        className="btn-primary"
        disabled={!stripe || processing}
        style={{
          marginTop: '2rem', width: '100%', padding: '1rem', height: 'auto', fontSize: '1.1rem', fontWeight: '700',
        }}
      >
        {processing ? 'Securing Transaction...' : `Confirm & Pay ${course.price}`}
      </button>

      <p style={{
        textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: '#94a3b8',
      }}
      >
        By clicking pay, you agree to our professional service terms and conditions.
      </p>
    </form>
  );
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use state if available, fallback to localStorage if refreshed
  const course = location.state?.course || JSON.parse(localStorage.getItem('lastViewedCourse'));
  const student = location.state?.student || JSON.parse(localStorage.getItem('userInfo'));

  if (!course || !student) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem' }}>
        <p>Session expired or invalid. Please start enrollment again.</p>
        <button type="button" onClick={() => navigate('/all-courses')} className="btn-primary" style={{ width: 'auto', marginTop: '1rem' }}>Back to Courses</button>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ paddingTop: '100px', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      <div className="container">
        <Elements stripe={stripePromise}>
          <CheckoutForm course={course} student={student} />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
