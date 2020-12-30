import React from 'react';
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import modernArt from '../../images/modernArt.jpg';
import { Link } from 'react-router-dom';

const ProductCard = ({product}) => {

    const {title, description, images, slug, price } = product;

    const { Meta } = Card;

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
                <>
                    <ShoppingCartOutlined className='text-danger'/> <br /> Add To Cart
                </>
            ]}
        >
            <Meta title={`${title} - $${price}`} description={`${description && description.substring(0, 40)}...`}/>
        </Card>
    )
}

export default ProductCard;