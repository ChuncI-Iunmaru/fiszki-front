import React, { useContext, useEffect } from 'react';
import SubscriptionContext from "../../../context/subscription/subscriptionContext";
import SubscriptionItem from "../../subscriptions/SubscriptionItem";
import AuthContext from "../../../context/auth/authContext";
import Spinner from "../../layout/Spinner";

const Subscription = () => {
    const authContext = useContext(AuthContext);
    const subscriptionContext = useContext(SubscriptionContext);

    const { subscriptions, getMySubscriptions, loading } = subscriptionContext;

    useEffect(() => {
        console.log('Odświeżam');
        authContext.loadUser();
        getMySubscriptions();
        // eslint-disable-next-line
    }, []);

    if (subscriptions !== null && subscriptions.length === 0 && !loading) {
        return (<h4>Nie zapisano na żaden zestaw!</h4>)
    }

    return (
        <div className="grid-2">
            {subscriptions !== null && !loading
                ? subscriptions.map(subscription => (<SubscriptionItem key={subscription.id} subscription={subscription}/>))
                : <Spinner/>}
        </div>
    )
};

export default Subscription;