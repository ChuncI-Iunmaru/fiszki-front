import React, { useContext, useEffect } from 'react';
import AuthContext from "../../context/auth/authContext";
import Sets from "../sets/Sets";

const BrowseSets = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log('Odświeżam');
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <Sets/>
        </div>
    )
};

export default BrowseSets;