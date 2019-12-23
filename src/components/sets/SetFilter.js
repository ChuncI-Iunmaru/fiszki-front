import React, { useContext, useRef, useEffect } from 'react';
import SetContext from "../../context/flashcardSet/setContext";

const SetFilter = () => {
    const setContext = useContext(SetContext);
    const text = useRef('');

    const { filtered, filterSets, clearSetFilter} = setContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = e => {
        if (text.current.value !== ''){
            filterSets(e.target.value);
        } else {
            clearSetFilter();
        }
    };

    return (
        <form>
            <input ref={text} type="text" placeholder="Wyszukaj zestaw..." onChange={onChange}/>
        </form>
    )
};

export default SetFilter;