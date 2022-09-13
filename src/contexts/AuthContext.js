import React, {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import Axios from 'axios';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const PRIVATE_KEY = "4601e714-e143-48b8-b3d6-781da88e3a20";
    const PROJECT_ID = "780e17fa-278d-4c44-8960-a7680673442c";

    const [loading, setLoading] = useState(true);
    const [userNow, setUserNow] = useState(null);
    const navigate = useNavigate();

    const googleSignIn = () => {
        signInWithPopup(auth, new GoogleAuthProvider())
        .then((result) => {
          setUserNow(result.user);
          console.log(userNow);
        }).then(() => {
            navigate('/chats');
        }).catch((err) => {
          console.log(err.message);
        });
    }
    const fbSignIn = () => {
        signInWithPopup(auth, new FacebookAuthProvider())
        .then((result) => {
          setUserNow(result.user);
          console.log(userNow);
        }).then(() => {
            navigate('/chats');
        }).catch((err) => {
          console.log(err.message);
        });
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        //blob() contains image

        return new File([data], 'userPhoto.jpg', { type: 'image/jpeg'});
    }

    useEffect(()=>{
        if(!userNow) {
            navigate('/');
            return;
        }

        Axios.get(`https://api.chatengine.io/users/${userNow.email}`, {
            headers : {
                "private-key" : PRIVATE_KEY
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch((err)=> {
            //if there's no existing user, create one in chat-engine db
            let name = userNow.displayName.split(" ");
            let firstName = name[0];
            let lastName = name[1];
            const formdata = {
                "username": userNow.email,
                "email": userNow.email,
                "first_name": firstName,
                "last_name": lastName,
                "secret": userNow.uid,
            };
            console.log(formdata);
            Axios.post('https://api.chatengine.io/users/', 
                formdata,
                { 
                    headers : { "private-key" : PRIVATE_KEY }
                }
            ).then( () => {
                setLoading(false);
            }).catch((err)=> {
                console.log(err.message)
            })
            /*
            getFile(userNow.photoURL)
                .then((avatar) => {
                    formdata = {...formdata, 'avatar': avatar};
                    Axios.post('https://api.chatengine.io/users/', 
                        formdata,
                        { headers : { 'private-key' : "4601e714-e143-48b8-b3d6-781da88e3a20"}}
                    ).then( () => {
                        setLoading(false);
                    }).catch((err)=> {
                        console.log(err.message)
                    })
                });
            */
        })

    },[userNow, navigate]);

    /*
    useEffect(()=>{    
        onAuthStateChanged(auth, (user) => {
            if(user) {          
                setUserNow(user);
                setLoading(false);
                navigate('/chats');
            }
        })
    },[userNow, navigate]);
    */

    const value = { userNow, setUserNow, googleSignIn, fbSignIn, PROJECT_ID };

    return (
        <AuthContext.Provider value ={value}>
            {children}
        </AuthContext.Provider>
    );
}