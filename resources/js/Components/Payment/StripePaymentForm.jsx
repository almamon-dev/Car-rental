import React, { useState, useEffect } from "react";
import {
    CardElement,
    useStripe,
    useElements,
    Elements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ShieldCheck, 
    Lock, 
    CreditCard, 
    ChevronRight, 
    Loader2
} from "lucide-react";

/**
 * COMPACT EXECUTIVE CARD FORM
 */

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#1f2937",
            fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "14px",
            "::placeholder": {
                color: "#9ca3af"
            },
            iconColor: "#0a66c2",
        },
        invalid: {
            color: "#dc2626",
            iconColor: "#dc2626"
        }
    }
};

const CheckoutForm = ({ amount, carId, onSuccess, onCancel, currency }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        axios.post(route('user.stripe.intent'), {
            amount: amount,
            car_id: carId
        }).then(res => {
            setClientSecret(res.data.clientSecret);
        }).catch(err => {
            setError("Connectivity error.");
        });
    }, [amount, carId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;
        setProcessing(true);
        setError(null);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (payload.error) {
            setError(payload.error.message);
            setProcessing(false);
        } else {
            // Finalize on backend
            axios.post(route('user.stripe.success'), {
                amount: amount,
                car_id: carId,
                method: 'card',
                transaction_id: payload.paymentIntent.id
            }).then(res => {
                onSuccess(payload.paymentIntent);
            }).catch(err => {
                setError("Payment verified but booking record failed. Please contact support.");
                setProcessing(false);
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                    <label className="text-[12px] font-bold text-gray-700">Card Data</label>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase">
                        <Lock size={10} />
                        Encrypted
                    </div>
                </div>

                <div className="bg-white border border-gray-300 rounded-[4px] p-3 focus-within:ring-1 focus-within:ring-[#0a66c2] transition-all">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[#dc2626] text-[11px] font-bold mt-1 px-1"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[12px] font-bold text-gray-400 uppercase">Total Liability</span>
                <span className="text-[18px] font-bold text-gray-900">{currency}{amount.toLocaleString()}</span>
            </div>

            <div className="space-y-2">
                <button
                    disabled={processing || !stripe || !clientSecret}
                    className="w-full py-2.5 bg-[#0a66c2] text-white text-[14px] font-bold rounded-full hover:bg-[#004182] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {processing ? (
                        <Loader2 className="animate-spin" size={16} />
                    ) : (
                        'Confirm Payment'
                    )}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full py-1 text-gray-500 text-[11px] font-bold hover:underline"
                >
                    Different Method
                </button>
            </div>
        </form>
    );
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY || "pk_test_placeholder");

export default function StripePaymentForm({ amount, carId, onSuccess, onCancel, currency = '৳' }) {
    return (
        <Elements stripe={stripePromise}>
            <div className="font-sans text-gray-900">
                <CheckoutForm 
                    amount={amount} 
                    carId={carId} 
                    onSuccess={onSuccess} 
                    onCancel={onCancel} 
                    currency={currency}
                />
            </div>
        </Elements>
    );
}
