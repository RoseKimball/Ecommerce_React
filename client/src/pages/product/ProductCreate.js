import React, { useState, useEffect } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../functions/product';
import ProductCreateForm from '../../components/forms/ProductCreateForm';
import { getCategories } from '../../functions/category';
import FileUpload from '../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';

const ProductCreate = () => {
    const [values, setValues] = useState({
        title: '',
        description: '',
        price: 0,
        categories: [],
        category: '',
        quantity: 0,
        images: [],
        colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
        brands: ['Delaroq', 'The Line By K', 'Petite Studio', 'Retrouvai', 'Namesake'],
        color: '',
        brand: ''
    });
    const [loading, setLoading] = useState(false);

    const {user} = useSelector(state => ({...state}));

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () => {
        getCategories().then(c => setValues({...values, categories: c.data}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(user.token, values)
            .then(res => {
                window.alert(`${res.data.title} is created`);
                // window.location.reload();
                setValues({...values, title: '', description: '', price: 0, images: [], quantity: 0})
            })
            .catch(err => {
                toast.error(err.response.data.err)
            })
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav />
                </div>
                <div className='col-md-10'>
                    {loading ? (<LoadingOutlined className='text-danger h1'/>) : (<h4>Product Create</h4>)}
                    <hr />
                    <div className='p-3'>
                        <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
                    </div>
                    <ProductCreateForm handleSubmit={handleSubmit} handleChange={handleChange} values={values}/>
                </div>
            </div>
        </div>
    )
}

export default ProductCreate;