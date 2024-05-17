import React, { forwardRef } from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; //toast message

// Added forwardRef to make the component compatible with react-flip-move
const CheckoutProduct = forwardRef(({ id, title, image, price, rating, hideButton }, ref) => {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        });
    };

    const notify = () => {
        toast.info('🦄 Removed From Basket', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
        });
    };

    const handleButtonClick = () => {
        removeFromBasket();
        notify();
    };

    return (
        <div className='checkoutProduct' ref={ref}>
            <img className='checkoutProduct__image' src={image} />

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p key={i}>🌟</p>
                        ))}
                </div>
                {!hideButton && (
                    <button onClick={handleButtonClick}>Remove from Basket</button>
                )}
            </div>
        </div>
    );
});

export default CheckoutProduct;
