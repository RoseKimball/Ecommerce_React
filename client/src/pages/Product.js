import React, { useEffect, useState } from 'react';
import { getProduct, getRelated } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import ProductCard from '../components/cards/ProductCard';

const Product = ({match}) => {
    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([])

    const {slug} = match.params;

    useEffect(() => {
        loadSingleProduct();
    }, [slug])

    const loadSingleProduct = () => {
        getProduct(slug).then(res => {
            setProduct(res.data)
            getRelated(res.data._id).then(res => {
                setRelated(res.data)
            })
        })
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='row pt-4'>
                    <SingleProduct product={product}/>
                </div>
                <div className='col text-center pt-5 pb-5'>
                    <hr />
                        <h4>Related Products</h4>
                    <hr />
                </div>
                <div className='row'>
                    <div className='row pb-5'>
                        {related.length ? related.map((r) => (
                                <div className='col-md-3' key={r._id}>
                                    <ProductCard product={r}/>
                                </div>
                        )) : (<div className='text-center col'>No Product Found</div>)}
                    </div>
                </div>
            </div>
        </>
    ) 
        
}

export default Product;