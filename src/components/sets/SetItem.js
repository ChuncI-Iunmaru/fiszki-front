import React from 'react';
import PropTypes from 'prop-types';

const SetItem = ({ set }) => {
    const { title, dailyAmount, testQuestionsNum, testTime, testAttempts, testAccessible, flashcards } = set;

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
                <button className="btn btn-dark btn-sm">Edytuj</button>
                <button className="btn btn-danger btn-sm">Usuń</button>
            </p>
        </div>
    )
};

SetItem.propTypes = {
    set: PropTypes.object.isRequired,
};

export default SetItem;