import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import FlipMove from 'react-flip-move';

function Checkout() {
    const [{ basket, user }, dispatch] = useStateValue();
    
    return (
        <div className='checkout'>
            <div className='checkout__left'>
                <img
                    className="checkout__ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt=""
                />

                <div>
                    <h3>hello, {user?.email} </h3>
                    <h2 className='checkout__title'>Your shopping Basket</h2>
                    {/* Added FlipMove wrapper here */}
                    <FlipMove>
                        {basket.map(item => (
                            <CheckoutProduct
                                key={item.id}
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
            <div className='checkout__right'>
                <h2>The subtotal goes here</h2>
                <Subtotal />
            </div>
        </div>
    );
}

export default Checkout;



