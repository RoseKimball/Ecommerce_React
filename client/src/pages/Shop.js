import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getProductsByCount } from '../functions/product';
import { UseSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        loadAllProducts();
    }, [])
    
    const loadAllProducts = () => {
        getProductsByCount(12).then(res => {
            setProducts(res.data)
            setLoading(false);
        })
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3'>
                    search filter menu
                </div>
                <div className='col-md-9'>
                    {loading ? (
                        <h4 className='text-danger'>loading...</h4>
                    ) : (
                        <h4 className=''>Products</h4>
                    )}
                    {products.length < 1 && <p>No Products Found</p>}

                    <div className='row pb-5'>
                        {products.map((p) => (
                            <div key={p._id} className='col-md-4 mt-3'>
                                <ProductCard product={p}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Shop;

