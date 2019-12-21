import React, { useState, useContext, useEffect } from 'react';
import SetContext from "../../context/flashcardSet/setContext";
import { withRouter } from 'react-router-dom';
import FlashcardContext from "../../context/flashcard/flashcardContext";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const SetForm = (props) => {
    const setContext = useContext(SetContext);
    const flashcardContext = useContext(FlashcardContext);
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { addSet, current, clearCurrentSet, updateSet } = setContext;
    const { marked, clearMarked} = flashcardContext;
    const { user } = authContext;
    const { setAlert } = alertContext;

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

    useEffect(() => {
        if (current !== null) {
            setSet(current);
            //TODO Tu powinno być pobranie z bazy listy fiszek dla danego zestawu i przekazanie ich jako parametr
            //ALbo przekazanie id zestawu jako parametr czy coś
        } else {
            setSet({
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
            clearMarked();
        }
    }, [setContext, current]);

    const {creator, title, dailyAmount, testQuestionsNum, testTime, testAttempts, testAccessible, flashcards, password} = set;

    const onChange = e => setSet({...set, [e.target.name]: e.target.value});

    const onSubmit = e =>{
        e.preventDefault();
        if (title === '') {
            setAlert('Tytuł nie może być pusty!', 'danger');
        } else if (marked.length === 0) {
            setAlert('Conajmniej 1 fiszka musi być zaznaczona!', 'danger');
        } else {
            e.preventDefault();
            if (current === null) {
                addSet(set, marked, user);
            } else {
                updateSet(set, marked, user);
            }
            // TODO nie haszować hasła w backend, albo jak inaczej je odszyfrować
            clearMarked();
            setSet({
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
            props.history.push('/sets');
        }
    };

    const clearAll = () => {
        clearCurrentSet();
        clearMarked();
    };

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edytuj zestaw' : 'Nowy zestaw'}</h2>
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
                <input type="submit" value={current ? 'Zapisz zmiany' : 'Dodaj'} className="btn btn-primary btn-block"/>
            </div>
            {current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>Wyczyść</button>
            </div>}
        </form>
    )
};

export default withRouter(SetForm);