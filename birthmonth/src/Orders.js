import React, { useEffect, useState } from 'react'
import './Orders.css';
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import Order from './Order';

function Orders() {
 const [{ basket, user }, dispatch] = useStateValue();
 const [orders, setOrders] = useState([]);


// useEffect(() => {
//   db.collection('users').doc(user?.uid).collection('orders').orderBy('created', 'desc').onSnapshot(onSnapshot => (
//     setOrders(onSnapshot.docs.map(doc => ({
//       id: doc.id,
//       data: doc.data()
//     })))
//   ))
// }, [])

useEffect(() => {
  if (user?.uid) {
    db.collection('users').doc(user.uid).collection('orders').orderBy('created', 'desc').onSnapshot(snapshot => {
      setOrders(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    });
  }
  else {
    setOrders([]);
  }
}, [user]); // Include user in the dependency array


  return (
    <div className='orders'>
       <h1>Your Orders</h1>
       <div className='orders__order'>
          {orders?.map(order => (
            <Order order={order} />
          ))}
       </div>
    </div>
  )
}

export default Orders
