import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getProductsByCount, fetchProductsByFilter } from '../functions/product';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import {Menu, Slider} from 'antd';
import { DollarOutlined } from '@ant-design/icons';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);

    let dispatch = useDispatch();
    let {search} = useSelector((state) => ({...state}));
    const {text} = search;

    const {SubMenu, ItemGroup} = Menu;

    useEffect(() => {
        setLoading(true);
        loadAllProducts();
    }, [])
    
    //load products by default
    const loadAllProducts = () => {
        getProductsByCount(12).then(res => {
            console.log('res products by count', res.data)
            setProducts(res.data)
            setLoading(false);
        })
    }
    //load products by user search 
    useEffect(() => {
        if(text && text.length) {
            fetchProducts({query: text});
        }
    }, [text])

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then(res => { 
            if(Array.isArray(res.data.products)) {
                setProducts(res.data.products)
                setLoading(false);
            }
        });
    }

    // load products by price range
    // useEffect(() => {
    //     console.log('ok to request');
    //     fetchProducts({price})
    // }, [ok])

    // on slider change...
    const handleSlider = (value) => {
        // change search text back to empty
        dispatch({
            type: 'SEARCH_QUERY',
            payload: {text: ''}
        })
        // set the state of price based on value input
        setPrice(value);

        // we don't want to make a request for every time the slider changes, so we delay it.
        // setTimeout(() => {
        //     // setOk(!ok)
            
        // }, 300)
        fetchProducts({price})
        // now that ok is true, useEffect will run and make an api call to filter products.
    }

    return (
        <div className='container-fluid'>
            {/* {JSON.stringify(products, null, 4)} */}
            <div className='row'>
                <div className='col-md-3 pt-2'>
                    <h4>Search Filter</h4>
                    <hr />
                    <Menu defaultOpenKeys={['1']} mode='inline'>
                        <SubMenu 
                            key='1' 
                            title={
                                <span className='h6'>
                                    <DollarOutlined />
                                    Price
                                </span>
                            }>
                            <div>
                                <Slider 
                                    className='ml-4 mr-4' 
                                    tipFormatter={(v) => `$${v}`} 
                                    range value={price} 
                                    onChange={handleSlider}
                                    max='4999' 
                                />
                            </div>
                        </SubMenu>
                    </Menu>
                </div>
                <div className='col-md-9 pt-2'>
                    {loading ? (
                        <h4 className='text-danger'>loading...</h4>
                    ) : (
                        <h4 className=''>Products</h4>
                    )}
                    {products && (products.length < 1 && <p>No Products Found</p>)}

                    <div className='row pb-5'>
                        {products && products.map((p) => (
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

