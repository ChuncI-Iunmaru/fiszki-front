import React, { useContext, useEffect } from 'react';
import AuthContext from "../../../context/auth/authContext";
import SetFilter from "../../sets/SetFilter";
import Sets from "../../sets/Sets";
import SubscriptionContext from "../../../context/subscription/subscriptionContext";

const BrowseAllSets = () => {
    const authContext = useContext(AuthContext);
    const subscriptionContext = useContext(SubscriptionContext);

    useEffect(() => {
        console.log('Odświeżam');
        authContext.loadUser();
        //Konieczne żeby prawidłowo pokazać na które zestawy już zapisano
        subscriptionContext.getMySubscriptions();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <SetFilter/>
            <Sets studentView={true}/>
        </div>
    )
};

export default BrowseAllSets;