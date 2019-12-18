import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SetContext from "../../context/flashcardSet/setContext";
import FlashcardContext from "../../context/flashcard/flashcardContext";

const SetItem = ({ set, history }) => {
    const setContext = useContext(SetContext);
    const flashcardContext = useContext(FlashcardContext);
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
        setMarked(flashcards);
        // redirect do strony edycji
        history.push("/editSet");
    };

    const onSubscribers = () => {
        // TODO Załaduj listę zapisanych na dany zestaw
        //Przekieruj na stronę z detalami
        history.push('/subscription');
    };

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">{title}</h3>
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
            <p>
                <button className="btn btn-dark btn-sm" onClick={onEdit}>Edytuj</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Usuń</button>
                <button className="btn btn-primary btn-sm" onClick={onSubscribers}>Uczniowie</button>
            </p>
        </div>
    )
};

SetItem.propTypes = {
    set: PropTypes.object.isRequired,
};

export default withRouter(SetItem);