import React from 'react';
import ModalImage from 'react-modal-image';
import ModernArt from '../../images/modernArt.jpg';
import { useDispatch } from 'react-redux';
import {CloseOutlined} from '@ant-design/icons';
import {toast} from 'react-toastify';


const ProductCardInCheckout = ({product}) => {
    const dispatch = useDispatch();

    const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];

    const handleColorChange = (e) => {
        let cart = [];

        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }

            cart.map((p, i) => {
                if(product._id === p._id) {
                    cart[i].color = e.target.value
                }
                return cart
            })

            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart,
            })
        }
    }

    const handleQuanityChange = (e) => {
        let cart = [];
        let count = e.target.value < 1 ? 1 : e.target.value;

        if(e.target.value > product.quantity) {
            toast.error(`max available quantity: ${product.quantity}`)
        }

        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }

            cart.map((p, i) => {
                if(product._id === p._id) {
                    cart[i].count = count;
                }
                return cart
            })

            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart,
            })
        }
    }

    const handleRemove = () => {
        let cart = [];
        
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }


            cart.map((p, i) => {
                if(product._id === p._id) {
                    cart.splice(i, 1)
                }
                return cart
            })

            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart,
            })
        }
    }
    
    return (
        <tbody>
            <tr>
                <td>
                    <div style={{width: '100px', height: 'auto'}}>
                        {product.images.length ? (
                            <ModalImage small={product.images[0].url} large={product.images[0].url}/>
                            ) : (
                            <ModalImage small={ModernArt} large={ModernArt}/>
                            )
                        }
                    </div>
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.brand}</td>
                <td>
                    <select onChange={handleColorChange} name='color' className='form-control'>
                        {product.color ? <option>{product.color}</option> : <option>Select</option>}
                        {colors.filter((c) => c !== product.color).map((c) => (
                            <option key={c} vlaue={c}>{c}</option>
                        ))}
                    </select>
                </td>
                <td className='text-center' style={{width: '100px'}}>
                    <input onChange={handleQuanityChange} type='number' className='form-control' value={product.count}/>
                </td>
                <td className='text-center'>
                    <CloseOutlined className='text-danger' stle={{cursor: 'pointer'}} onClick={handleRemove}/>
                </td>
            </tr>
        </tbody>
    )
}

export default ProductCardInCheckout;