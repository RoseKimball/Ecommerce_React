import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import { userCart } from '../functions/user';

const Cart = ({history}) => {
    const {cart, user} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();

    const getTotal = () => {
        return cart.reduce((curr, next) => {
            return curr + next.count * next.price
        }, 0)
    }

    const saveAllToDB = () => {
        userCart(user.token, cart)
        .then(res => {
            if(res.data.ok) {
                history.push('/checkout')
            }
        })
        .catch(err => {
            console.log('cart save err', err)
        })
    }

    const showCartItems = () => {
       return (
            <table className='table table-bordered'>
                <thead className='thead-light'>
                    <tr>
                        <th scope='col'>Image</th>
                        <th scope='col'>Title</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Brand</th>
                        <th scope='col'>Color</th>
                        <th scope='col'>Count</th>
                        <th scope='col'>Remove</th>
                    </tr>
                </thead>
                {cart.map((p) =>(
                    <ProductCardInCheckout key={p._id} product={p}/>
                ))}
            </table>
       )
    }

    return (
        <div className='container-fluid pt-2'>
            <div className='row'>
                <div className='col-md-8'>
                    <h4>Cart / {cart.length} Product(s)</h4>
                    {!cart.length ? 
                        (<p>No Products in Cart. <Link to='/shop'>Continue shopping.</Link></p>) 
                        : (showCartItems())
                    }
                </div>
                <div className='col-md-4'>
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Products</p>
                    {cart.map((c, index) => (
                        <div key={index}>
                            <p>{c.title} x {c.count} = ${c.price*c.count}</p>
                        </div>
                    ))}
                    <hr />
                    <p>Total: <b>${getTotal()}</b></p>
                    <hr />
                    {
                        user && user.token ? (
                            <button 
                                disabled={!cart.length} 
                                onClick={saveAllToDB} 
                                className='btn btn-sm btn-primary mt-2'
                            >
                                Proceed to Checkout
                            </button>
                        ) : (
                            <button 
                                disabled={!cart.length} 
                                className='btn btn-sm btn-primary mt-2'
                            >
                                <Link to={{pathname: '/login', state: {from: 'cart'}}}>Login to Checkout</Link>
                            </button> 
                        )
                    }
                </div>
            </div>
        </div> 
    )
}

export default Cart;