import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from 'firebase';

///the error in my server occured after I changed the firebase config code

function Header() {
    const [{basket, user}, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth().signOut();
        }
    }
  return (
    <div className='header'>
        <Link to={'/'}>
            <img className='logo__image' src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='' />
        </Link>

        <div className='header__search'>
            <input className='header__searchInput'/>
            <SearchIcon className='header__searchIcon' />

        </div>

        <div className='header__nav'>
            <Link to={!user && '/login'}>
                <div onClick={handleAuthentication} className='header__option'>
                    <p className='header__optionLineOne'>Hello {!user ? 'Guest' : user?.email}</p>
                    <p className='header__optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</p>
                </div>
            </Link>
            <Link to={'/orders'} >
            <div className='header__option'>
                <p className='header__optionLineOne'>Returns</p>
                <p className='header__optionLineTwo'>& Orders</p>
            </div>
            </Link>
            

            <div className='header__option'>
                <p className='header__optionLineOne'>Your</p>
                <p className='header__optionLineTwo'>Prime</p>
            </div>


             <Link to={'/checkout'}>
            <div className='basket'>
                <ShoppingBasketIcon className='basket__icon' />
                <p className='basket__count'>{basket.length}</p>
            </div>
            </Link>
        </div>
      
    </div>
  )
}

export default Header
