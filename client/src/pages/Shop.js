
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getProductsByCount, fetchProductsByFilter } from '../functions/product';
import { getCategories } from '../functions/category';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import {Menu, Slider, Checkbox, Radio} from 'antd';
import { DollarOutlined, DownSquareOutlined } from '@ant-design/icons';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [brands, setBrands] = useState(['Delaroq', 'The Line By K', 'Petite Studio', 'Retrouvai', 'Namesake']);
    const [brand, setBrand] = useState('');
    const [colors, setColors] = useState(['Black', 'Brown', 'Silver', 'White', 'Blue']);
    const [color, setColor] = useState('');

    let dispatch = useDispatch();
    let {search} = useSelector((state) => ({...state}));
    const {text} = search;

    const {SubMenu, ItemGroup} = Menu;

    useEffect(() => {
        loadAllProducts();
        getCategories().then(res => setCategories(res.data));
    }, [])

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then(res => { 
            if(Array.isArray(res.data)) {
                // setProducts(res.data.products)
                setProducts(res.data)
            }
        });
    }

    
    //load products by default
    const loadAllProducts = () => {
        getProductsByCount(12).then(res => {
            console.log('res products by count', res.data)
            setProducts(res.data)
        })
    }
    //load products by user search 
    useEffect(() => {
        if(text && text.length) {
            fetchProducts({query: text});
        }
    }, [text])


    // load products by price range
    useEffect(() => {
        fetchProducts({ price });
      }, [price]);
    
    // on slider change...
    const handleSlider = (value) => {
        // change search text back to empty
        // dispatch({
        //     type: 'SEARCH_QUERY',
        //     payload: {text: ''}
        // })
        // set the state of price based on value input
        setPrice(value);

        // we don't want to make a request for every time the slider changes, so we delay it.
        // setTimeout(() => {
        //     // setOk(!ok)
            
        // }, 300)
        // now that ok is true, useEffect will run and make an api call to filter products.
    }

    // load products by category
    const showCategories = () => categories.map((c) => (
        <div key={c._id}>
            <Checkbox 
                value={c._id} 
                className='pb-2 pl-4 pr-4' 
                name='category'
                onChange={handleCheck}
                checked={categoryIds.includes(c._id)}
            >
                {c.name}
            </Checkbox>
            <br />
        </div>
    ))

    const handleCheck = (e) => {
        // take value of the cateogry that has been checked, and put it in the state
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked)
        // indexOf: if not found, returns -1. if it is, returns index

        if(foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            inTheState.splice(foundInTheState, 1);
        }
        setCategoryIds(inTheState);
        console.log(inTheState);

        fetchProducts({category: inTheState})
        console.log('state products after api call', products);
    }

    // filter products by brand
    const showBrands = () => brands.map((b) => (
        <Radio value={b} name={b} checked={b === brand} onChange={handleBrand} className='pb-1 pl-1 pr-4'>
            {b}
        </Radio>
    ))

    const handleBrand = (e) => {
        setBrand(e.target.value)
        fetchProducts({brand: e.target.value})
        console.log(brand);
    }

    //filter products by color
    const showColors = () => colors.map((c) => (
        <Radio value={c} name={c} checked={c === color} onChange={handleColor} className='pb-1 pl-1 pr-4'>
            {c}
        </Radio>
    ))

    const handleColor = (e) => {
        setBrand(e.target.value)
        fetchProducts({color: e.target.value})
        console.log(brand);
    }


    return (
        <div className='container-fluid'>
            {/* {JSON.stringify(products, null, 4)} */}
            <div className='row'>
                <div className='col-md-3 pt-2'>
                    <h4>Search Filter</h4>
                    <hr />
                    <Menu defaultOpenKeys={['1', '2', '3', '4']} mode='inline'>
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
                        <SubMenu 
                            key='2' 
                            title={
                                <span className='h6'>
                                    <DownSquareOutlined />
                                    Categories
                                </span>
                            }>
                            <div>
                                {showCategories()}
                            </div>
                        </SubMenu>
                        <SubMenu 
                            key='3' 
                            title={
                                <span className='h6'>
                                    <DownSquareOutlined />
                                    Brands
                                </span>
                            }>
                            <div>
                                {showBrands()}
                            </div>
                        </SubMenu>
                        <SubMenu 
                            key='4' 
                            title={
                                <span className='h6'>
                                    <DownSquareOutlined />
                                    Colors
                                </span>
                            }>
                            <div>
                                {showColors()}
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

