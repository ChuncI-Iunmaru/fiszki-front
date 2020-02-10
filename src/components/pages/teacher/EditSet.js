import React, { useContext, useEffect } from 'react';
import AuthContext from "../../../context/auth/authContext";
import SetForm from "../../sets/SetForm";
import Flashcards from "../../flashcards/Flashcards";
import FlashcardFilter from "../../flashcards/FlashcardFilter"
import SubscriptionContext from "../../../context/subscription/subscriptionContext";
import AlertContext from "../../../context/alert/alertContext";
import SetContext from "../../../context/flashcardSet/setContext";

const EditSet = () => {
    const authContext = useContext(AuthContext);
    const subscriptionContext = useContext(SubscriptionContext);
    const alertContext = useContext(AlertContext);
    const setContext = useContext(SetContext);
    const { subscriptions, getSubscriptionsForSet} = subscriptionContext;
    const { current} = setContext;

    useEffect(() => {
        console.log('Odświeżam');
        authContext.loadUser();
        if (current !== null) {
            getSubscriptionsForSet(current.id);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (subscriptions.length !== 0) {
            alertContext.setAlert("Edytujesz zestaw, na który zapisani są uczniowie. Zapisanie zmian spowoduje wymazanie ich postępów.", "danger");
        }
    }, [subscriptions]);

    return (
        <div className="grid-2">
            <div>
                <SetForm/>
            </div>
            <div>
                <FlashcardFilter/>
                <Flashcards checkOnly={true}/>
            </div>
        </div>
    )
};

export default EditSet;