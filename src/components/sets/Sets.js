import React, { useContext, Fragment } from 'react';
import SetContext from "../../context/flashcardSet/setContext";
import SetItem from "./SetItem";

const Sets = () => {
    const setContext = useContext(SetContext);
    const { sets } = setContext;

    return (
        <Fragment>
            <div className="grid-2">
                {sets.map(set => (<SetItem key={set.id} set={set}/>))}
            </div>
        </Fragment>
    )
};

export default Sets;