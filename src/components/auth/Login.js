import React, { useState, useContext, useEffect } from 'react';
import authContext from "../../context/auth/authContext";
import alertContext from "../../context/alert/alertContext";

const Login = (props) => {
    const AlertContext = useContext(alertContext);
    const AuthContext = useContext(authContext);

    const { setAlert } = AlertContext;

    const { login, error, clearErrors, isAuthenticated } = AuthContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'Invalid credentials') {
            setAlert('Błędne dane logowania!', 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name: '',
        password: ''
    });

    const { name, password} = user;

    const onChange = e => setUser({
        ...user,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || password === '') {
            setAlert('Pola nie mogą być puste', 'danger');
        } else {
            login({
                name,
                password
            });
        }
    };

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange}/>
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>
        </div>
    );
};

export default Login;