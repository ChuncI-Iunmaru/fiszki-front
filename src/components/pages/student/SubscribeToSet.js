import React, { useContext, useEffect, useRef } from 'react';
import AuthContext from "../../../context/auth/authContext";
import SetContext from "../../../context/flashcardSet/setContext";
import SubscriptionContext from "../../../context/subscription/subscriptionContext";
import AlertContext from "../../../context/alert/alertContext";
import { withRouter } from 'react-router-dom';

const SubscribeToSet = (props) => {
    const authContext = useContext(AuthContext);
    const setContext = useContext(SetContext);
    const subscriptionContext = useContext(SubscriptionContext);
    const alertContext = useContext(AlertContext);

    const { current } = setContext;
    const { user, loadUser } = authContext;
    const { setAlert } = alertContext;

    const password = useRef('');

    useEffect(() => {
        console.log('Odświeżam');
        loadUser();
        // eslint-disable-next-line
    }, []);

    const onSubmit = e => {
        e.preventDefault();
        console.log(password.current.value);
        if (current.password !== '') {
            if (password.current.value === current.password) {
                subscriptionContext.subscribe(user, current);
                props.history.push('/mySubscriptions');
            } else {
                setAlert('Wprowadż prawidłowe hasło', 'danger');
            }
        } else {
            subscriptionContext.subscribe(user, current);
            props.history.push('/mySubscriptions');
        }
    };

    return (
        <div className="form-container">
            <h3 className="text-primary">{current.title}</h3>
            <form onSubmit={onSubmit}>
                { current.password === ''
                    ? <h4 className="text-dark">Zestaw nie jest zabezpieczony hasłem</h4>
                    : <input ref={password} type="password" placeholder="Podaj hasło..."/>}
                <input type="submit" className="btn btn-success btn-block" value="Zapisz się"/>
            </form>
        </div>
    )
};

export default withRouter(SubscribeToSet);