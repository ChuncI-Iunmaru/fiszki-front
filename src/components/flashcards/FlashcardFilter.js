import React, { useContext, useRef, useEffect } from 'react';
import FlashcardContext from "../../context/flashcard/flashcardContext";

const FlashcardFilter = () => {
    const flashcardContext = useContext(FlashcardContext);
    const tags = useRef();
    const { filterFlashcards, clearFilter, filtered }= flashcardContext;


    useEffect(() => {
        if (filtered === null) {
            tags.current.value = ''
        }
    });

    // To może nie on change, ciągle wysyła requesty
    const onChange = e => {
        e.target.value.replace(/\s/g,'');
        if (tags.current.value === '') clearFilter();
    };

    const onSubmit = e => {
        e.preventDefault();
        if (tags.current.value !== '') {
            filterFlashcards(tags.current.value);
        } else {
            clearFilter();
        }
    };

    const onClear = e => {
        clearFilter()
    };

    return (
        <form onSubmit={onSubmit}>
            <input ref={tags} type="text" placeholder="Rozdziel tagi przecinkiem..." onChange={onChange}/>
            <div className="grid-2">
                <input type="submit" className="btn btn-dark btn-block" value="Szukaj"/>
                <input type="button" className="btn btn-light btn-block" onClick={onClear} value="Wyczyść filtr"/>
            </div>
        </form>
    )

};

export default FlashcardFilter;