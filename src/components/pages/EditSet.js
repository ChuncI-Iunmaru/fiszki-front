import React, { useContext, useEffect } from 'react';
import AuthContext from "../../context/auth/authContext";
import SetForm from "../sets/SetForm";

const EditSet = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log('Odświeżam');
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="grid-2">
            <SetForm/>
        </div>
    )
};

export default EditSet;