import React, { useContext, useEffect } from 'react';
import SetContext from "../../context/flashcardSet/setContext";
import SetItem from "./SetItem";
import Spinner from "../layout/Spinner";
import PropTypes from 'prop-types'

const Sets = ({ studentView = false}) => {
    const setContext = useContext(SetContext);
    const { sets, loading, getMySets, filtered, getAllSets } = setContext;

    useEffect(() => {
        if (studentView) getAllSets();
        else getMySets();
        // eslint-disable-next-line
    }, []);

    if (sets !== null && sets.length === 0 && !loading) {
        return (<h4>Brak zestawów</h4>);
    }

    return (
            <div className="grid-2">
                { filtered !== null
                    ? filtered.map(set => (<SetItem key={set.id} set={set} studentView={studentView}/>))
                    : sets !== null && !loading
                        ? sets.map(set => (<SetItem key={set.id} set={set} studentView={studentView}/>))
                        : <Spinner/>}
            </div>
    )
};

Sets.propTypes = {
  studentView: PropTypes.bool
};

export default Sets;