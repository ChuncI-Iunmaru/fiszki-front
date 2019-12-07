import React, { useState, useContext } from 'react';
import alertContext from "../../context/alert/alertContext";

const Register = () => {
    const AlertContext = useContext(alertContext);

    const { setAlert } = AlertContext;

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        role: 'student'
    });

    const { name, email, password, password2, role} = user;

    const onChange = e => setUser({
        ...user,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === ''){
            setAlert('Pola nie mogą być puste', 'danger');
        } else if (password !== password2) {
            setAlert('Hasła muszą być identyczne', 'danger');
        }
        console.log('Register submit');
    };

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="role">Rola </label>
                    <input type="radio" name="role" value="student" checked={role === 'student'} onChange={onChange}/> Uczeń{' '}
                    <input type="radio" name="role" value="teacher" checked={role === 'teacher'} onChange={onChange}/> Nauczyciel{' '}
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block"/>
            </form>
        </div>
    );
};

export default Register;