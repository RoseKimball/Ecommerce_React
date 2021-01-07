import React, {useState, useEffect} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {useSelector, useDispatch} from 'react-redux';
import {createPaymentIntent} from '../functions/stripe';

const StripeCheckout = ({history}) => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');

    const dispatch = useDispatch();
    const {user} = useSelector((state) => ({...state}))

    const stripe = useStripe();
    const elements = useElements();

    const cartStyle = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#32325d",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      };

    useEffect(() => {
        createPaymentIntent(user.token)
        .then(res => {
            console.log('create payment intent', res.data);
            setClientSecret(res.data)
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)

        console.log('client secret', clientSecret)
        const payload = await stripe.confirmCardPayment(clientSecret.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value,
                }
            }
        })
        if(payload.error) {
            setError(`Payment failed. ${payload.error.message}`)
        } else {
            console.log('payload', JSON.stringify(payload, null, 4))
            setError(null)
            setProcessing(false)
            setSucceeded(true)
        }
    } 

    const handleChange = async (e) => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message : '')
    } 


    return (
        <>
            <p className={succeeded ? 'result-message' : 'result-message hidden'}>Payment Succesful.</p>
            <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
                <CardElement id='card-element' options={cartStyle} onChange={handleChange}/>
                <button className='stripe-button' disabled={processing || disabled || succeeded}>
                    <span id='button-text'>
                        {processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
                    </span>
                </button>
                <br />
                {error && <div className='card-error' role='alert'>{error}</div>}
            </form>
            
        </>
    )
}

export default StripeCheckout;

