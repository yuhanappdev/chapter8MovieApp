import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const defaultContext = {
    isLoading: false,
    userInfo: undefined,
    login: (email, password) => {},
    getUserInfo: () => {},
    logout: () => {}
};

const UserContext = createContext(defaultContext);

const UserContextProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const login = (email, password) => {
        AsyncStorage.setItem('token', 'save your token').then( () => {
            setUserInfo({
                name: 'yuhanappdev',
                email: 'yuhanappdevlecture@gmail.com'
            });
            setIsLoading(true);
        });
    };

    const getUserInfo = () => {
        AsyncStorage.getItem('token')
            .then(value => {
                if(value) {
                    setUserInfo({
                        name: 'yuhanappdev',
                        email: 'yuhanappdevlecture@gmail.com'
                    });
                }
                setIsLoading(true);
            })
            .catch( () => {
                setUserInfo(undefined);
                setIsLoading(true);
            });
    }

    const logout = () => {
        AsyncStorage.removeItem('token');
        setUserInfo(undefined);
    };

    useEffect( ()=> {
        getUserInfo();
    }, []);

    return (
        <UserContext.Provider
            value={{
                isLoading,
                userInfo,
                login,
                getUserInfo,
                logout
            }}>
                {children}
            </UserContext.Provider>
    );
};

export {UserContext, UserContextProvider};