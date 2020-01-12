import React from 'react';
import checkLinkType from "../../utils/getLinkType";

const TestQuestion = ({ testQuestion, onAnswerChange}) => {

    const { flashcardId, question, answers, givenAnswer } = testQuestion;

    const onChange = e => {
        onAnswerChange(flashcardId, e.target.value);
    };

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
      <form className="card bg-light">
          {renderFrontText(question)}
          {answers.map(answer =>
              <div className="form-group" key={answer}>
                  <input type="radio" value={answer} checked={givenAnswer === answer} onChange={onChange}/>{' '}{answer}
              </div>)}
      </form>
    );

};

export default TestQuestion;