import React from 'react'
import './Product.css'
import { useStateValue } from './StateProvider';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  //toast message

function Product({id, title, price, rating, image}) {

  const [state, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      }
    });


  }

  const notify = () => {
    toast.info('🦄 Added To Basket', {
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
  }

  const handleButtonClick =()=> {
    addToBasket();
    notify();
}




  return (
    <div className='product'>
      <div className='product__info'>
        <p>{title}</p>
        <p className='price'><strong><small>$</small>{price}</strong></p>

        <div className='rating'>

           {Array(rating).fill().map((_, i)=>(
                <p>🌟</p>
           ))}
            
            
        </div>
      </div>

      <img src={image} alt='' />
      {/* <button  onClick={addToBasket}>Add to Cart</button> */}
      <button onClick={handleButtonClick}>Add to Cart</button>
    </div>
  )
}

export default Product
