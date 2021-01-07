import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../functions/category';

const CategoryCreate = ({ history, match }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const {user} = useSelector(state => ({...state}))
    
    useEffect(() => {
        loadCategory();
    }, [])

    const loadCategory = () => {
        getCategory(match.params.slug).then(c => setName(c.data.name))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);

        if(user && user.token) {
            console.log(user.token)
            updateCategory(user.token, match.params.slug, {name})
            .then(res => {
                console.log(res);
                setLoading(false);
                setName('');
                toast.success(`${res.data.name} is created`);
                history.push('/admin/category')
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                toast.error(err);
            })
        }
    }

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
                <button className='btn btn-outline-primary'>save</button>
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
                    { loading ? (<h4 className='text-danger'>Loading...</h4>) : (<h4>Update Category</h4>)}
                    {CategoryForm()}
                </div>
            </div>
        </div>
        </>
    )
}

export default CategoryCreate;