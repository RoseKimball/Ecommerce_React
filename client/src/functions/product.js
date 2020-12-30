import axios from 'axios';

export const createProduct = async (authtoken, product) => {
    return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: {
            authtoken
        }
    })
}

export const getProductsByCount = async (count) => {
    return await axios.get(`${process.env.REACT_APP_API}/product/products/${count}`)
}

export const removeProduct = async (authtoken, slug) => {
    return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers: {
            authtoken
        }
    })
}

export const getProduct = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)
}

export const updateProduct = async (authtoken, slug, product) => {
    return await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
        headers: {
            authtoken
        }
    })
}

export const getProducts = async (sort, order, page) => {
    return await axios.post(`${process.env.REACT_APP_API}/product/products`, {
        sort, 
        order, 
        page
    })
}

export const getProductsCount = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/product/products/total`)
}

export const getRelated = async (productId) => {
    return await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`)
}

export const fetchProductsByFilter = async (arg) => {
    return await axios.post(`${process.env.REACT_APP_API}/product/search/filters`, arg)
}


