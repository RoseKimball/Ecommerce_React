import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getUserCart, emptyUserCart, setUserAddress } from '../functions/user';
import {toast} from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Link} from 'react-router-dom';

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState('');
    const [addressSaved, setAddressSaved] = useState(false);

    const dispatch = useDispatch();
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        getUserCart(user.token)
        .then(res => {
            setProducts(res.data.products);
            setTotal(res.data.cartTotal);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const saveAddressToDb = () => {
        setUserAddress(user.token, address).then(res => {
            if(res.data.ok) {
                setAddressSaved(true);
                toast.success('Address saved')
            }
        })
    }

    const emptyCart = () => {
        //remove from local storage
        if(typeof window !== 'undefined') {
            localStorage.removeItem('cart')
        }

        //remove from redux
        dispatch({
            type: 'ADD_TO_CART',
            payload: [],
        })

        //remove from backend
        emptyUserCart(user.token)
        .then(res => {
            setProducts([]);
            setTotal(0);
            toast.success('Cart is empty.')
        })
        .catch(err => {
            console.log(err)
        })

    }

    return (
        <div className='row'>
            <div className='col-md-6'>
                <h4>Delivery Address</h4>
                <br />
                <br />
                <ReactQuill theme='snow' value={address} onChange={setAddress}/>
                <button className='btn btn-primary mt-2' onClick={saveAddressToDb}>Save</button>
            </div>

            <div className='col-md-6'>
                <h4>Order Summary</h4>
                <hr />
                <p>{products.length} Products</p>
                <hr />
                {products && products.length && products.map((p, i) => (
                    <div key={p._id}>
                        <p>{p.product.title} ({p.color}) x {p.count} = {p.product.price * p.count}</p>
                    </div>
                ))}
                <hr />
                <p>Cart total: {total}</p>

                <div className='row'>
                    <div className='col-md-6'>
                        <Link to='/payment'>
                            <button disabled={!addressSaved} className='btn btn-primary'>Place Order</button>
                        </Link>
                    </div>

                    <div className='col-md-6'>
                        <button disabled={!products.length} onClick={emptyCart} className='btn btn-primary'>Empty Cart</button>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default Checkout;