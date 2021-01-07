import React, {useState} from 'react';
import modernArt from '../../images/modernArt.jpg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import _ from 'lodash';

const ProductCard = ({product}) => {
    const [tooltip, setTooltip] = useState('Click to Add');

    const {user, cart} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();

    const {title, description, images, slug, price } = product;
    const { Meta } = Card;

    const handleAddToCart = (e) => {
        e.preventDefault();
        let cart = [];
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.push({
                ...product,
                count: 1,
            });
            // remove duplicates
            let unique = _.uniqWith(cart, _.isEqual);
            // save to local storage
            localStorage.setItem('cart', JSON.stringify(unique))
            setTooltip('Added');
            dispatch({
                type: 'ADD_TO_CART',
                payload: unique
            })
        }

    }

    return (
        <Card
            cover={
                <img 
                    src={images && images.length ? images[0].url : modernArt} 
                    style={{height: '150px', objectFit: 'cover'}}
                    className='p-1'
                />
            }
            actions={[
                <Link to={`/product/${slug}`}>
                    <EyeOutlined className='text-warning'/> <br /> View Product
                </Link>
                ,
                <Tooltip title={tooltip}>
                    <a href='#' onClick={handleAddToCart}>
                        <ShoppingCartOutlined className='text-danger'/> <br /> Add To Cart
                    </a>
                </Tooltip>
            ]}
        >
            <Meta title={`${title} - $${price}`} description={`${description && description.substring(0, 40)}...`}/>
        </Card>
    )
}

export default ProductCard;