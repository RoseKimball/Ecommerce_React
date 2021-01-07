import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { Avatar, Badge } from 'antd';

const FileUpload = ({values, setValues, setLoading}) => {
    const {user} = useSelector((state) => ({...state}));

    const fileUploadAndResize = (e) => {
        //resize
        let files = e.target.files;
        let allUploadedFiles = values.images;

        if(files) {
            setLoading(true)
            for(let i = 0; i < files.length; i ++) {
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
                    axios.post(`${process.env.REACT_APP_API}/image/uploadImages`, {image: uri}, {
                        headers: {
                            authtoken: user ? user.token : ""
                        }
                    })
                    .then(res => {
                        setLoading(false);
                        allUploadedFiles.push(res.data);
                        setValues({...values, images: allUploadedFiles})
                    })
                    .catch(err => {
                        setLoading(false);
                        console.log('cloudinary upload error')
                    })
                }, "base64");
            }
        }
        //send back to server to upload to cloudinary

        //recieve response with url, add to images[] in parent component
    }

    const handleImageRemove = (public_id) => {
        setLoading(true);

        axios.post(`${process.env.REACT_APP_API}/image/removeImage`, {public_id}, {
            headers: {
                authtoken: user ? user.token : ""
            }
        })
        .then(res => {
            setLoading(false);
            const { images } = values;
            let filteredImages = images.filter((image) => {
                return image.public_id !== public_id;
            })
            setValues({...values, images: filteredImages});
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }

    return (
        <>
            <div className='row'>
                {values.images && values.images.map((image) => (
                    <Badge count="X" key={image.public_id} onClick={() => handleImageRemove(image.public_id)} style={{cursor: 'pointer'}}>
                        <Avatar shape='square' src={image.url} size={100} className='ml-3 mb-3'/>
                    </Badge>
                ))}
            </div>
            <div className='row'>
                <label className='btn btn-primary btn-raised mt-3'>Choose file(s)
                    <input type='file' hidden multiple accept='images/*' onChange={fileUploadAndResize}></input>
                </label>
            </div>
        </>
    )
}

export default FileUpload;