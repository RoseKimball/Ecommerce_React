import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { getProductsByCount, removeProduct } from '../../functions/product';
import AdminProductCard from '../../components/cards/AdminProductCard';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';


const AdminDashboard = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const {user} = useSelector(state => ({...state}))

    useEffect(() => {
        loadAllProducts();
    }, [])

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(100)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }

    const handleRemove = (slug) => {
        let answer = window.confirm('Are you sure you want to delete?');
        if(answer) {
            // console.log('send delete request', slug)
            removeProduct(user.token, slug)
            .then(res => {
                loadAllProducts();
                toast.error(`${res.data.title} is deleted`)
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <>
            <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav />
                </div>
                
                <div className='col'>
                    { loading ? (<h4 className='text-danger'>loading...</h4>) : (<h4>All Products</h4>)}
                    <div className='row'>
                        {products.map(product => (
                            <div className='col-md-4 pb-3' key={product._id}>
                                <AdminProductCard product={product} key={product._id} handleRemove={handleRemove}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AdminDashboard;