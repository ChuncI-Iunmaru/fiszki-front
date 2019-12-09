import React, { useContext, useEffect } from 'react';
import authContext from "../../context/auth/authContext";

const Home = () => {
    const AuthContext = useContext(authContext);

    useEffect(() => {
        console.log('Odświeżam');
        AuthContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
};

export default Home;