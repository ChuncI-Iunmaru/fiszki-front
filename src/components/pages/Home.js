import React, { useContext, useEffect } from 'react';
import authContext from "../../context/auth/authContext";
import { withRouter } from 'react-router-dom';

const Home = ({history}) => {
    const AuthContext = useContext(authContext);

    const { loadUser, user } = AuthContext;

    useEffect(() => {
        console.log('Odświeżam');
        loadUser();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (user !== null) {
            if (user.role === 'student') {
                history.push("/mySubscriptions")
            } else history.push("/sets");
        }
        // eslint-disable-next-line
    }, [user, loadUser]);

    return (
        <div className="grid-2">
            Strona główna
        </div>
    )
};

export default withRouter(Home);