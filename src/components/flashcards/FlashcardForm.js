import React, {useState, useContext, useEffect} from 'react';
import FlashcardContext from "../../context/flashcard/flashcardContext";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const FlashcardForm = () => {
    const flashcardContext = useContext(FlashcardContext);
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const {addFlashcard, current, clearCurrent, updateFlashcard} = flashcardContext;

    const {user} = authContext;

    useEffect(() => {
        if (current !== null) {
            setFlashcard(current);
        } else {
            setFlashcard({
                frontText: '',
                backText: '',
                extraText: '',
                tags: [],
                userId: 0
            });
        }
    }, [flashcardContext]);

    const [flashcard, setFlashcard] = useState({
        frontText: '',
        backText: '',
        extraText: '',
        tags: [],
        userId: 0
    });

    const {frontText, backText, extraText, tags} = flashcard;

    const onChange = e => setFlashcard({...flashcard, [e.target.name]: e.target.value});

    const onTags = e => setFlashcard({...flashcard, [e.target.name]: e.target.value.replace(/\s/g, '').split(',')});

    const onSubmit = e => {
        e.preventDefault();
        flashcard.userId = user.id;

        if (frontText === '' || backText === '') {
            alertContext.setAlert('Front i tył nie mogą być puste', 'danger');
        } else if (tags.some(tag => tag.length > 20)) {
            alertContext.setAlert('Maksymalna długość tagu to 20 znaków', 'danger');
        } else {
            if (current === null) {
                addFlashcard(flashcard);
            } else {
                updateFlashcard(flashcard);
            }
            //Sprawdzić wartości tagów - nie może być duplikatów?
            setFlashcard({
                frontText: '',
                backText: '',
                extraText: '',
                tags: [],
                userId: 0
            });
            clearCurrent();
        }
    };

    const clearAll = () => {
        clearCurrent();
    };

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edytuj fiszkę' : 'Nowa fiszka'}</h2>
            <input type="text" placeholder="Front..." name="frontText" value={frontText} onChange={onChange}/>
            <input type="text" placeholder="Tył..." name="backText" value={backText} onChange={onChange}/>
            <input type="text" placeholder="Dodatkowy tekst..." name="extraText" value={extraText} onChange={onChange}/>
            {/* Jak tagi wypisze przy edytowaniu?*/}
            <input type="text" placeholder="Rozdziel tagi przecinkiem..." name="tags" value={tags} onChange={onTags}/>
            <input type="submit" className="btn btn-dark btn-block" value={current ? 'Zapisz zmiany' : 'Dodaj'}/>
            {current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>Wyczyść</button>
            </div>}
        </form>
    )
};

export default FlashcardForm;