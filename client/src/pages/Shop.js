
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

    //load products when first mounted
    useEffect(() => {
        loadAllProducts();
        getCategories().then((res) => setCategories(res.data));
      }, []);

      //handle user search query
      useEffect(() => {
        const delayed = setTimeout(() => {
          fetchProducts({ query: text });
          if (!text) {
            loadAllProducts();
          }
        }, 300);
        return () => clearTimeout(delayed);
      }, [text]);

      //only filter products by price if state is ok
      useEffect(() => {
        fetchProducts({ price });
      }, [ok]);

      //helper function for filtering products
    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
          setProducts(res.data);
        });
      };

    //helper function for loading products
    const loadAllProducts = () => {
        getProductsByCount(12).then((p) => {
          setProducts(p.data);
          setLoading(false);
        });
      };
    
    //filter by price
    const handleSlider = (value) => {
        dispatch({
          type: "SEARCH_QUERY",
          payload: { text: "" },
        });
    
        // reset
        setCategoryIds([]);
        setPrice(value);
        setTimeout(() => {
          setOk(!ok);
        }, 300);
      };

    //filter by cateogry
    const handleCheck = (e) => {
        // reset
        dispatch({
          type: "SEARCH_QUERY",
          payload: { text: "" },
        });
        setPrice([0, 0]);
        setBrand("");
        setColor("");
        // console.log(e.target.value);
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // index or -1
    
        // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
        if (foundInTheState === -1) {
          inTheState.push(justChecked);
        //   setCategoryIds(inTheState);
        } else {
          // if found pull out one item from index
          inTheState.splice(foundInTheState, 1);
        //   setCategoryIds(inTheState);
        }
        
        setCategoryIds(inTheState);

        if(!inTheState.length) {
            loadAllProducts();
        } else {
            fetchProducts({ category: inTheState });
        }

    //filter by brand
    const handleBrand = (e) => {
        dispatch({
          type: "SEARCH_QUERY",
          payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setColor("");
        setBrand(e.target.value);
        fetchProducts({ brand: e.target.value });
      };

    //filter by color
    const handleColor = (e) => {
        dispatch({
          type: "SEARCH_QUERY",
          payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setBrand("");
        setColor(e.target.value);
        fetchProducts({ color: e.target.value });
      };

    //render categories
    const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

    //render brands
    const showBrands = () =>
        brands.map((b) => (
        <Radio
            value={b}
            name={b}
            checked={b === brand}
            onChange={handleBrand}
            className="pb-1 pl-4 pr-4"
        >
            {b}
        </Radio>
    ));

    //render colors
    const showColors = () =>
    colors.map((c) => (
      <Radio
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));


    return (
        <div className='container-fluid'>
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
}

export default Shop;

