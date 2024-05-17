
import './App.css';
import Checkout from './Checkout';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Routes, Route}
from 'react-router-dom';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from 'firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements, elements} from '@stripe/react-stripe-js';
import Orders from './Orders';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  //toast message




const promise = loadStripe('pk_test_51PAL9I09idQbuC9sxMCgf5Q2jxCpdQP288JpBwxo7WQEoMjoCgW8SZLV5Yz7zfGDpr7RL4L8HH9NDoCnkUsAeNij00d6wMXJPB');
function App() {
  const [{}, dispatch] = useStateValue();


  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(authUser => {
      // This callback function will be called whenever the authentication state changes
      
      // Uncomment the following line if you want to log the user details to the console
      // console.log('the user is >>>>', authUser);
  
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        });
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    });
  
    // Return a cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  

  return (
    <Router>
      <Header />
   
      <div className="App">

      <Routes>
            <Route path='/' element={<Home />} >
            
            </Route>

            <Route path='/checkout' element={<Checkout/>} />

            <Route path='/login' element={<Login/>} >

            </Route>
            <Route path='/payment' element={<Elements stripe={promise}><Payment/></Elements> }/>
            <Route path='/orders' element={<Orders/>}/>

        </Routes>
        <ToastContainer/>

        
      
      
      
      </div>
    </Router>
  );
}

export default App;
