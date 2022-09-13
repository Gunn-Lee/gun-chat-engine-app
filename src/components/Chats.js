import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';

const Chats = () => {

    const { userNow, loading, PROJECT_ID }  = useAuth();
    console.log(userNow);

    const navigate = useNavigate();

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/');
    }

    if(!userNow || loading) return 'Loading...';

    return(
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    Chat-App
                </div>
                <div onClick = {handleLogout} className='logout-tab'>
                    Logout
                </div>
            </div>

            <ChatEngine 
                height="calc(100vh - 66px)"
                projectID={PROJECT_ID}
                userName={userNow.email}
                userSecret={userNow.uid}
            />
        </div>
    );

}

export default Chats;