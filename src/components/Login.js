import React from 'react';
import { GoogleOutlined, FacebookOutlined, MailOutlined } from '@ant-design/icons';
import 'firebase/app';
import { useAuth } from '../contexts/AuthContext';


const Login = () => {

    const {googleSignIn, fbSignIn} = useAuth();

    return(
        <main id='login-page'>
            <div id='login-card'>
                <h2>Welcome to Chat App!</h2>
                <div 
                    className='login-button google'
                    onClick={googleSignIn}
                >
                    <GoogleOutlined />
                    Sign in with Google
                </div>
                <div 
                    className='login-button facebook'
                    onClick={fbSignIn}
                >
                    <FacebookOutlined />
                    Sign in with Facebook
                </div>
                <div 
                    className='login-button email'
                >
                    <MailOutlined />
                    Sign in with Other Email
                </div>
            </div>
        </main>
    );
}

export default Login;