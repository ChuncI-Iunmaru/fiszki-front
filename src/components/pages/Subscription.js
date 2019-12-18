import React, { Fragment, useContext, useEffect } from 'react';
import SubscriptionContext from "../../context/subscription/subscriptionContext";
import SubscriptionItem from "../subscriptions/SubscriptionItem";
import AuthContext from "../../context/auth/authContext";

const Subscription = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log('Odświeżam');
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    const subscriptionContext = useContext(SubscriptionContext);

    const { subscriptions } = subscriptionContext;

    return (
        <Fragment>
            {subscriptions.map(subscription => <SubscriptionItem subscription={subscription}/>)}
        </Fragment>
    )
};

export default Subscription;