import React, { useEffect } from 'react';
import { Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from './ProductListItems';
import ModernArt from '../../images/modernArt.jpg'

const { TabPane } = Tabs;


const SingleProduct = (props) => {
    // const { title, description, images, slug } = product;

    useEffect(() => {
        console.log('passed to child component', props.product)
    })

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
                        <>
                            <ShoppingCartOutlined  className='text-success'/> Add to Cart
                        </>
                    ]}
                >
                    <ProductListItems product={props.product}/>
                </Card>
            </div>
        </>
    )
}

export default SingleProduct;