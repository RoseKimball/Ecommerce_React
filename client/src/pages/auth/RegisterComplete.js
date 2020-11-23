import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';


const RegisterComplete = ({ history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
        // console.log(window.location.href);
        // console.log(window.localStorage.getItem('emailForRegistration'))
    }, [])

    const completeRegistrationForm = () => <form onSubmit={handleSubmit}>
        <input 
            type="email" 
            className="form-control" 
            value={email} 
            disabled
            autoFocus
        />

        <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            autoFocus
        />
        <br/>
        <button type="submit" className="btn btn-raised">Complete Registration</button>
    </form>

    const handleSubmit = async (e) => {
        e.preventDefault();
        //valiation
        //if no email or no password
        if(!email || !password) {
            toast.error('Email and password is required');
            return;
        }
        //if password is too short
        if(password.length < 6) {
            toast.error('password must be at least 6 characters long.');
            return;
        }

       try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            // console.log('RESULT', result)
            if(result.user.emailVerified) {
                //remove user email from local storage
                window.localStorage.removeItem('emailForRegistration');
                // get user id token
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                // redux store
                console.log('USER', user, "idTokenResult", idTokenResult);
                // redirect user to dashboard
                // history.push('/')
            }
       } catch(error ) {
            console.log(error);
            toast.error(error.message);
       }
    }

    return (
        <div className="container p-5">
           <div className="row"> 
              <div className="col-md-6 offset-md-3">
                <h4>Complete Registration</h4>
                {completeRegistrationForm()}
              </div>  
           </div> 
        </div>
    );
};

export default RegisterComplete;