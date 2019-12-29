import React from 'react';

const TestQuestion = ({ testQuestion, onAnswerChange}) => {

    const { flashcardId, question, answers, givenAnswer } = testQuestion;

    const onChange = e => {
        onAnswerChange(flashcardId, e.target.value);
    };

    return (
      <form className="card bg-light">
          <h4 className="text-primary">{question}:</h4>
          {answers.map(answer =>
              <div className="form-group" key={answer}>
                  <input type="radio" value={answer} checked={givenAnswer === answer} onChange={onChange}/>{' '}{answer}
              </div>)}
      </form>
    );

};

export default TestQuestion;