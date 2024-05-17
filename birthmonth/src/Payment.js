import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link, useNavigate } from 'react-router-dom'
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js'
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase'
import FlipMove from 'react-flip-move';
import 'react-toastify/dist/ReactToastify.css';  //toast message
import { Bounce } from 'react-toastify'
import { Flip, ToastContainer, toast } from 'react-toastify';






function Payment() {

    //hereeee


///THIS CODE RIGHT HERE GOT RID OF THE ERROR I GET WHEN I GO TO PAYMENTS



    const [{ basket, user }, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState(true); // Initialize with null
    const [processing, setProcessing] = useState();
    const navigate = useNavigate();


    const notify = () => {
        toast.success('🦄 Payment Successfull', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }

    useEffect(() => {
        const getClientSecret = async () => {
            try {
                const response = await axios({
                    method: 'post',
                    url: `/payments/create?total=${getBasketTotal(basket) * 100}`
                });
                setClientSecret(response.data.clientSecret);
            } catch (err) {
                console.error('Error fetching client secret:', err);
                // Handle the error (e.g., show an error message to the user)
            }
        };
        getClientSecret();
    }, [basket]); // Empty dependency array for one-time fetch

    console.log('THE SECRET IS >>>', clientSecret);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
    
        try {
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });
    
            if (error) {
                setError(error.message);
                setSucceeded(false);
                setProcessing(false); // Make sure to set processing to false in case of error
            } else {
                notify();
                // Uses Firestore to push orders into the Firebase database
                await db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                });
    
                setSucceeded(true);
                setError(null);
                setProcessing(false);
                navigate('/orders');
                dispatch({
                    type: 'EMPTY_BASKET'
                });
                
            }
        } catch (err) {
            console.error('Error confirming payment:', err);
            // Handle the error (e.g., show an error message to the user)
            setError('An error occurred while processing your payment. Please try again later.');
            setSucceeded(false);
            setProcessing(false);
        }
    }
    










    const handleChange = event => {
        //this will check for changes in the card and write errors if there are
        //any errors to show
        setDisabled(event.empty);
        setError(event.error ? event.error.message : '');

    }


  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>
                Checkout(
                    <Link to={'/checkout'}>
                        {basket?.length} items
                    </Link>
                )
            </h1>

            {/* SECTION 1 */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>

                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>138 Van Beek</p>
                    <p>New Doornfontein, JHB</p>
                </div>

            </div>

            {/* SECTION 2*/}


            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items andd delivery</h3>
                </div>
                <div className='payment__items'>
                    <FlipMove>
                        {basket.map(item => (
                        <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}

                        
                        />
                        
                    ))}
                    </FlipMove>
                </div>
                
            </div>
            

            {/* SECTION 3  */}


            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    {/**Stripe magic here */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className='payment__priceContainer'>
                        <CurrencyFormat
                                renderText={(value) => (
                                
                                    <h3>
                                    {/* Part of the homework */}
                                    Order Total: <strong>{value}</strong>
                                    </h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)} // Part of the homework
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                        />
                        <button disabled={processing || disabled || succeeded}><span>{processing ? <p>processing</p> : 'Buy Now'} </span></button>
                        </div>

                        {error && <div>{error}</div>}
                    </form>

                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Payment
