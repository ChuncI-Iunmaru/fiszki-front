import React, { useContext, useEffect } from 'react';
import SetContext from "../../context/flashcardSet/setContext";
import SetItem from "./SetItem";
import Spinner from "../layout/Spinner";

const Sets = () => {
    const setContext = useContext(SetContext);
    const { sets, loading, getMySets } = setContext;

    useEffect(() => {
        getMySets();
        // eslint-disable-next-line
    }, []);

    if (sets !== null && sets.length === 0 && !loading) {
        return (<h4>Brak zestawów</h4>);
    }

    return (
            <div className="grid-2">
                {sets !== null && !loading
                    ? sets.map(set => (<SetItem key={set.id} set={set}/>))
                    : <Spinner/>}
            </div>
    )
};

export default Sets;