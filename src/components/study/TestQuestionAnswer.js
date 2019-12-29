import React from 'react';

const TestQuestionAnswer = ({testQuestion}) => {

    const { givenAnswer, correctAnswer, question, correct} = testQuestion;

    return (
        <div className="card bg-light grid-3">
            <div className="form-group">
                <label className="text-primary">Pytanie: </label>
                <p className="text-dark">{question}</p>
            </div>
            <div className="form-group">
                <label className="text-primary">Poprawna odpowiedź: </label>
                <p className="text-dark">{correctAnswer}</p>
            </div>
            <div className="form-group">
                <label className="text-primary">Twoja odpowiedź: </label>
                <p className={correct ? "badge-success" : "badge-danger"}>{givenAnswer} </p>
            </div>
        </div>
    );
};

export default TestQuestionAnswer;