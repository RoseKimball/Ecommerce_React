import React from 'react';
import UserNav from '../../components/nav/UserNav';

const userHistory = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <UserNav />
                </div>
                <div className='col'>user page</div>
            </div>
        </div>
    )
    
}

export default userHistory;