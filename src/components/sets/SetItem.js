import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SetContext from "../../context/flashcardSet/setContext";
import FlashcardContext from "../../context/flashcard/flashcardContext";
import SubscriptionContext from "../../context/subscription/subscriptionContext";

const SetItem = ({ set, history, studentView = false, subscribedView = false }) => {
    const setContext = useContext(SetContext);
    const flashcardContext = useContext(FlashcardContext);
    const subscriptionContext = useContext(SubscriptionContext);

    const { subscriptions } = subscriptionContext;
    const { clearMarked, setMarked } = flashcardContext;
    const { deleteSet, setCurrentSet, clearCurrentSet } = setContext;
    const {id, title, dailyAmount, testQuestionsNum, testTime, testAttempts, testAccessible, flashcards } = set;

    const onDelete = () => {
        deleteSet(id);
        clearMarked();
        clearCurrentSet();
    };

    const onEdit = () => {
        setCurrentSet(set);
        // Tutaj bug z dziejami imperium - patrz notatki
        //console.log(set);
        setMarked(flashcards);
        // redirect do strony edycji
        history.push("/editSet");
    };

    const onSubscribers = () => {
        // TODO Załaduj listę zapisanych na dany zestaw
        //Przekieruj na stronę z detalami
        history.push('/subscription');
    };

    const onFlashcards = () => {
        setCurrentSet(set);
        history.push('/setFlashcards');
    };

    const onJoin = () => {
        setCurrentSet(set);
        history.push('/subscribeForm');
    };

    const renderButtons = () => {
        if (subscribedView)
            return (
                <p>
                    <button className="btn btn-primary btn-sm" onClick={onFlashcards}>Fiszki</button>
                    <button className="btn btn-success btn-sm">Ucz się</button>
                    <button className="btn btn-dark btn-sm">Test</button>
                </p>
            );
        if (studentView) {
            if (subscriptions.some(subscription => subscription.flashcardSet.id === id)) {
                return (
                    <p>
                        <button className="btn btn-white btn-sm">Już zapisano</button>
                    </p>
                );
            } else {
                return (
                    <p>
                        <button className="btn btn-success btn-sm" onClick={onJoin}>Dołącz</button>
                    </p>
                );
            }
        } else return (
            <p>
                <button className="btn btn-dark btn-sm" onClick={onEdit}>Edytuj</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Usuń</button>
                <button className="btn btn-primary btn-sm" onClick={onSubscribers}>Uczniowie</button>
            </p>
        );
    };

    return (
        <div className={subscribedView ? "card bg-white" : "card bg-light"}>
            <h3 className="text-primary text-left ">{title}</h3>
            <ul className="list">
                <li><span className="badge-dark">Fiszki: {flashcards.length}</span></li>
                <li><span className="badge-light">Dziennie: {dailyAmount}</span></li>
            </ul>
            <h4 className="text-dark text-left">Test:</h4>
            <ul className="list grid-2">
                <li><i className="fas fa-question-circle"></i> {testQuestionsNum}</li>
                <li>Dostępny: {testAccessible === 'ALWAYS' ? 'zawsze' : 'skończona nauka'}</li>
                <li><i className="fas fa-hourglass-end"></i> {testTime !== 0
                    ? testTime
                    : (<i className="fas fa-infinity"></i>)}</li>
                <li>Podejścia: {testAttempts !== 0
                    ? testAttempts
                    : (<i className="fas fa-infinity"></i>)}</li>
            </ul>
            {renderButtons()}
        </div>
    )
};

SetItem.propTypes = {
    set: PropTypes.object.isRequired,
    studentView: PropTypes.bool,
    subscribedView: PropTypes.bool
};

export default withRouter(SetItem);