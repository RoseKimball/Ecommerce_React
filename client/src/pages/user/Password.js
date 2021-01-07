import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const Password = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false);
                toast.success('password updated!');
                setPassword("");
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.message)
            })
    }

    const passwordUpdateForm = () => {
        return (
            <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label>Your Password</label>
                <input
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    className='form-control'
                    placeholder='Enter new password'
                    disabled={loading}
                    value={password}
                />
                <button className='btn btn-outline-primary' disabled={!password || loading || password.length < 6}>Submit</button>
            </div>
        </form>
        )
    }
    
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <UserNav />
                </div>
                <div className='col'>
                    {loading ? <h4 className='danger'>loading...</h4> : <h4>password update</h4>}
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
  )  
}

export default Password;