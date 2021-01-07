import React, { useEffect, useState } from 'react';
import ProductListItems from './ProductListItems';
import ModernArt from '../../images/modernArt.jpg';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Tabs, Tooltip } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import _ from 'lodash';

const { TabPane } = Tabs;

const SingleProduct = (props) => {
    const [tooltip, setTooltip] = useState('Click to Add');

    const {user, cart} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('passed to child component', props.product)
    })

    const handleAddToCart = (e) => {
        e.preventDefault();

        let cart = [];
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.push({
                ...props.product,
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
        <>
            <div className='col-md-7'>
                {props.product.images && props.product.images.length ? (
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                    {props.product.images && props.product.images.map((i) => (
                        <img src={i.url} key={i.public_id }/>
                    ))}
                </Carousel>
                ) : (
                    <Card cover={<img src={ModernArt} className='mb-3 card-image'/>}/>
                )}
                <Tabs type='card'>
                    <TabPane tab='Description' key='1'>
                        {props.product.description && props.product.description}
                    </TabPane>
                    <TabPane tab='Reviews' key='2'>
                        This product is amazing! - Satsified Customer
                    </TabPane>
                </Tabs>
            </div>
            <div className='col-md-5'>
            <h1 className='bg-info p-3'>{props.product.title}</h1>
                <Card
                    actions={[
                        <Tooltip title={tooltip}>
                            <a href='#' onClick={handleAddToCart}>
                                <ShoppingCartOutlined className='text-danger'/> <br /> Add To Cart
                            </a>
                        </Tooltip>
                    ]}
                >
                    <ProductListItems product={props.product}/>
                </Card>
            </div>
        </>
    )
}

export default SingleProduct;