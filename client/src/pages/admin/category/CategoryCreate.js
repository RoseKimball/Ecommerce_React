import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';
import { createCategory, getCategories, removeCategory } from '../../../functions/category';
import { Link } from 'react-router-dom';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

const CategoryUpdate = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState(''); 

    const {user} = useSelector(state => ({...state})) 
     
    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () => {
        getCategories().then(c => setCategories(c.data))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);

        if(user && user.token) {
            console.log(user.token)
            createCategory(user.token, {name})
            .then(res => {
                console.log(res);
                setLoading(false);
                setName('');
                toast.success(`${res.data.name} is created`);
                loadCategories();
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                toast.error(err);
            })
        }
    }

    const handleRemove = async (slug) => {
        let answer = window.confirm('Are you sure you want to delete?');
        if(answer) {
            setLoading(true);
            removeCategory(slug, user.token)
                .then(res => {
                    setLoading(false)
                    toast.success(`${res.data.name} deleted`);
                    loadCategories();
                })
                .catch((err) => {
                    setLoading(false)
                    console.log(err)
                })
        }
    }

    const handleSearchChange = (e) => {
        e.preventDefault();

        setKeyword(e.target.value.toLowerCase())
    }

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

    const CategoryForm = () => {
        return (
            <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <h6>Name</h6>
                <input 
                    type='text' 
                    className='form-control' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    required
                />
                <br /> 
                <button className='btn btn-outline-primary mb-4'>save</button>
                <input 
                    type='search' 
                    placeholder='Search' 
                    value={keyword} 
                    onChange={handleSearchChange}
                    className='form-control mb-4'
                 />
            </div>
        </form>
        )
    }

    return (
        <>
            <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav />
                </div>
                <div className='col'>
                    { loading ? (<h4 className='text-danger'>Loading...</h4>) : (<h4>Create Category</h4>)}
                    {CategoryForm()}
                    <hr />
                    {categories.filter(searched(keyword)).map((c) => (
                        <div className='alert alert-secondary' key={c._id}>
                            {c.name} 
                            <span  onClick={() => handleRemove(c.slug)}className='btn btn-sm float-right'>
                                <DeleteOutlined className='text-danger'/>
                            </span> 
                            <Link to={`/admin/category/${c.slug}`}>
                                <span className='btn btn-sm float-right'>
                                    <EditOutlined  className='text-warning'/>
                                </span> 
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default CategoryUpdate;