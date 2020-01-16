import React, { useContext, useEffect } from 'react';
import SubscriptionContext from "../../../context/subscription/subscriptionContext";
import AuthContext from "../../../context/auth/authContext";
import Spinner from "../../layout/Spinner";
import SetContext from "../../../context/flashcardSet/setContext";
import TeacherViewSubscriptionItem from "../../subscriptions/TeacherViewSubscriptionItem";

const Subscription = () => {
    const authContext = useContext(AuthContext);
    const subscriptionContext = useContext(SubscriptionContext);
    const setContext = useContext(SetContext);

    const { subscriptions, getSubscriptionsForSet, loading } = subscriptionContext;
    const { current: {id, title}} = setContext;

    useEffect(() => {
        console.log('Odświeżam');
        authContext.loadUser();
        getSubscriptionsForSet(id);
        // eslint-disable-next-line
    }, []);

    if (subscriptions !== null && subscriptions.length === 0 && !loading) {
        return (<h4>Brak zapisanych na ten zestaw!</h4>)
    }

    return (
        <div>
            <h3>Zapisani na zestaw <span className="text-primary">{title}</span></h3>
            <div className="grid-2">
                {subscriptions !== null && !loading
                    ? subscriptions.map(subscription => (<TeacherViewSubscriptionItem key={subscription.id} subscription={subscription}/>))
                    : <Spinner/>}
            </div>
        </div>
    )
};

export default Subscription;