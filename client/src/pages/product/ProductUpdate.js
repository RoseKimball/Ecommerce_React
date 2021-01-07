
import React, { useState, useEffect } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';
import { getProduct, updateProduct } from '../../functions/product';
import { getCategories } from '../../functions/category';
import ProductUpdateForm from '../../components/forms/ProductUpdateForm';
import { LoadingOutlined } from '@ant-design/icons';
import FileUpload from '../../components/forms/FileUpload';

const ProductUpdate = ({match, history}) => {
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

    const {slug} = match.params;

    useEffect(() => {
        console.log('state before res', values)
        loadProduct();
        // loadCategories();
    }, [])

    const loadProduct = () => {
        getProduct(slug)
        .then(res => {
            console.log('res', res.data)
            setValues({...values, ...res.data})
        })
        .catch(err => {
            console.log(err)
        })

    }

    const handleSubmit = (e) => {   
        e.preventDefault();
        setLoading(true);
        updateProduct(user.token, slug, values)
        .then(res => {
            setLoading(false);
            toast.success(`${res.data.title} is updated`);
            history.push('/admin/dashboard')
        })
        .catch(err => {
            setLoading(false);
            console.log(err)
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
                {loading ? (<LoadingOutlined className='text-danger h1'/>) : (<h4>Product Update</h4>)}
                    <FileUpload 
                        values={values} 
                        setValues={setValues} 
                        setLoading={setLoading}
                    />
                    <br />
                    <ProductUpdateForm 
                        handleSubmit={handleSubmit} 
                        handleChange={handleChange} 
                        values={values}
                    />
                </div>
                <hr />
            </div>
        </div>
    )
}

export default ProductUpdate;