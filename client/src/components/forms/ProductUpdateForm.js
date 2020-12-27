import React from 'react';

const ProductUpdateForm = ({handleSubmit, handleChange, values}) => {

    const {
        title, 
        description,   
        price, 
        categories, 
        category, 
        quantity, 
        images, 
        colors, 
        brands, 
        color, 
        brand
    } = values

    return (
    <form onSubmit={handleSubmit}>
       <div className='form-group'>
            <h6>Title</h6>
            <input 
                type='text' 
                name='title' 
                className='form-control' 
                value={title}
                onChange={handleChange}
            ></input>
        </div>
        <div className='form-group'>
            <h6>Description</h6>
            <input 
                type='text' 
                name='description' 
                className='form-control' 
                value={description}
                onChange={handleChange}
            ></input>
        </div>
        <div className='form-group'>
            <h6>Price</h6>
            <input 
                type='number' 
                name='price' 
                className='form-control' 
                value={price}
                onChange={handleChange}
            ></input>
        </div>
        <div className='form-group'>
            <h6>Quantity</h6>
            <input 
                type='number' 
                name='quantity' 
                className='form-control' 
                value={quantity}
                onChange={handleChange}
            ></input>
        </div>
        <div className='form-group'>
            <h6>Color</h6>
            <select
                value={color}
                name='color'
                className='form-control'
                onChange={handleChange}
            >
            <option>Please select the color:</option>
                {colors.map((color) => (
                    <option key={color} value={color}>{color}</option>
                ))}
            </select>
        </div>
        <div className='form-group'>
            <h6>Brand</h6>
            <select
                value={brand}
                name='brand'
                className='form-control'
                onChange={handleChange}
            >
            <option>Please select the brand:</option>
                {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                ))}
            </select>
        </div>
        <button className='btn btn-outline-primary mb-4'>save</button>
    </form>                 
    )
}

export default ProductUpdateForm;