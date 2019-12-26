import React, { useContext } from 'react';
import getSubscriprionDateFromString from "../../utils/getSubscriprionDateFromString";
import PropTypes from 'prop-types';
import SetItem from "../sets/SetItem";
import SubscriptionContext from "../../context/subscription/subscriptionContext";

const SubscriptionItem = ({ subscription, subscribedView = false }) => {
    const subscriptionContext = useContext(SubscriptionContext);

    const { id, user,  flashcardSet, learnedFlashcards, scores, subscriptionDate} = subscription;

    const onUnsub = () => {
        subscriptionContext.unsubscribe(id);
    };

    return (
        <div className="card bg-light">
            {subscribedView && <SetItem set={flashcardSet} subscribedView={true}/>}
            <h3 className="text-primary text-center">{!subscribedView && user.username}</h3>
            <h4 className="text-dark text-left">Zapisany: {getSubscriprionDateFromString(subscriptionDate)}</h4>
            <h4 className="text-dark text-left">
                Postęp nauki: {learnedFlashcards.length}/{flashcardSet.flashcards.length}{' '}
                {(learnedFlashcards.length/flashcardSet.flashcards.length*100) === 100
                    ? <span style={{ color: 'green'}}>({learnedFlashcards.length/flashcardSet.flashcards.length*100})%</span>
                    : <span>({learnedFlashcards.length/flashcardSet.flashcards.length*100})%</span>}
            </h4>
            <h4 className="text-dark text-left">Wyniki testów: </h4>
            { subscribedView &&
                <p>
                    <button className="btn btn-block btn-danger" onClick={onUnsub}>Wypisz się</button>
                </p>
            }
        </div>
    )
};

SubscriptionItem.propTypes = {
    subscription: PropTypes.object.isRequired,
    subscribedView: PropTypes.bool,
};

export default SubscriptionItem;