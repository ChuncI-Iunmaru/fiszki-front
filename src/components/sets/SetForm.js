import React, { useState, useContext } from 'react';
import SetContext from "../../context/flashcardSet/setContext";
import FlashcardContext from "../../context/flashcard/flashcardContext";

const SetForm = () => {
    const setContext = useContext(SetContext);
    const flashcardContext = useContext(FlashcardContext);

    const { marked } = flashcardContext;

    //Skopiować marked do flashcards przy submit
    const [set, setSet] = useState({
        creator: null,
        title: '',
        dailyAmount: 0,
        testQuestionsNum: 0,
        testTime: 0,
        testAttempts: 0,
        testAccessible: 'ALWAYS',
        flashcards: [],
        password: ''
    });

    const {creator, title, dailyAmount, testQuestionsNum, testTime, testAttempts, testAccessible, flashcards, password} = set;

    const onChange = e => setSet({...set, [e.target.name]: e.target.value});

    return (
        <form>
            <h2 className="text-primary">Nowy zestaw</h2>
            <input type="text" placeholder="Nazwa zestawu..." name="title" value={title} onChange={onChange}/>
            <input type="password" placeholder="Hasło..." name="password" value={password} onChange={onChange}/>

            { marked.length === 0 && <span className="badge-danger">Nie zaznaczono żadnych fiszek</span>}

            <div className="form-group">
                <label htmlFor="dailyAmount">Dzienna ilość fiszek:</label>
                <input type="number" name="dailyAmount" min="1" max={marked.length}
                       value={dailyAmount} onChange={onChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="testQuestionsNum">Ilość pytań testowych:</label>
                <input type="number" name="testQuestionsNum" min="1"
                       max={marked.length} value={testQuestionsNum} onChange={onChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="testTime">Czas testu, 0 - brak limitu:</label>
                <input type="number" name="testTime" min="0" max="60"
                       value={testTime} onChange={onChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="testAttempts">Podejścia do testu, 0 - brak limitu:</label>
                <input type="number" name="testAttempts" min="0"
                       value={testAttempts} onChange={onChange}/>
            </div>

            <div className="form-group">
                <label htmlFor="testAccessible">Test dostępny: </label>
                <input type="radio" name="testAccessible" value="ALWAYS" checked={testAccessible === 'ALWAYS'}
                       onChange={onChange}/> Zawsze{' '}
                <input type="radio" name="testAccessible" value="AFTER_COMPLETION"
                       checked={testAccessible === 'AFTER_COMPLETION'} onChange={onChange}/> Po skończeniu nauki{' '}
            </div>

            <div>
                <input type="submit" value="Dodaj" className="btn btn-primary btn-block"/>
            </div>
        </form>
    )
};

export default SetForm;