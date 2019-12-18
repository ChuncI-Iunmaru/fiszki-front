import React from 'react';
import getSubscriprionDateFromString from "../../utils/getSubscriprionDateFromString";

const SubscriptionItem = ({ subscription }) => {

    const { user,  flashcardSet, learnedFlashcards, scores, subscriptionDate} = subscription;

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-center">{user.username}</h3>
            <h4 className="text-dark text-left">Zapisany: {getSubscriprionDateFromString(subscriptionDate)}</h4>
            <h4 className="text-dark text-left">
                Postęp nauki: {learnedFlashcards.length}/{flashcardSet.flashcards.length}{' '}
                {(learnedFlashcards.length/flashcardSet.flashcards.length*100) === 100
                    ? <span style={{ color: 'green'}}>({learnedFlashcards.length/flashcardSet.flashcards.length*100})%</span>
                    : <span>({learnedFlashcards.length/flashcardSet.flashcards.length*100})%</span>}
            </h4>
            <h4 className="text-dark text-left">Wyniki testów: </h4>
            <ul className="list">
                {scores.map(score =>
                    <li key={score.id}>
                        <span className="badge-light">
                            {getSubscriprionDateFromString(score.date)}: {score.score}%
                        </span>
                    </li>)}
            </ul>
        </div>
    )
};

export default SubscriptionItem;