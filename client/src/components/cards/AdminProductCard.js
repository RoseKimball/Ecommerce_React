import React from 'react';
import modernArt from '../../images/modernArt.jpg';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

const { Meta } = Card;

const AdminProductCard = ({product, handleRemove}) => {
    const { title, description, images, slug } = product;
    
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
                <Link to={`/admin/product/${slug}`}>
                    <EditOutlined className='text-warning'/>
                </Link>, 
                <DeleteOutlined onClick={() => handleRemove(slug)} className='text-danger'/>
            ]}
        >
            <Meta title={title} description={`${description && description.substring(0, 40)}...`}/>
        </Card>
    )
}

export default AdminProductCard;