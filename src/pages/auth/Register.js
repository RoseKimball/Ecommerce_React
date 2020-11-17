import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';


const Register = () => {

    const [email, setEmail] = useState("");

    const registerForm = () => <form onSubmit={handleSubmit}>
        <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            placeholder='email'
            autoFocus
        />
        <br/>
        <button type="submit" className="btn btn-raised">Register</button>
    </form>

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);

        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(email, config);
        //send user notification
        toast.success(`Email is sent to ${email} click the link to complete your registration.`)
        //save user email in local storage
        window.localStorage.setItem('emailForRegistration', email);
        //clear state
        setEmail('');
    }

    return (
        <div className="container p-5">
           <div className="row"> 
              <div className="col-md-6 offset-md-3">
                <h4>Register</h4>
                {registerForm()}
              </div>  
           </div> 
        </div>
    );
};

export default Register;