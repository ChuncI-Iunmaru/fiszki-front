import React from 'react';
import checkLinkType from "../../utils/getLinkType";

const TestQuestionAnswer = ({testQuestion}) => {

    const { givenAnswer, correctAnswer, question, correct} = testQuestion;

    //TODO wyciągnąć to jakoś - praktycznie ta sama funkcja w trzech miejscach
    const renderFrontText = (text) => {
        const result = checkLinkType(text);
        switch (result.type) {
            case 'image': return (<img src={text} alt="Obrazek"/>);
            case 'audio': return (
                <audio controls>
                    <source src={text} type={`audio/${result.extension}`}/>
                </audio>
            );
            case 'unsupported': return (<a href={text}>{text}</a>);
            default: return (<h3 className="text-dark text-left"> {text} </h3>);
        }
    };

    return (
        <div className="card bg-light grid-3">
            <div className="form-group">
                <label className="text-primary">Pytanie: </label>
                {renderFrontText(question)}
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