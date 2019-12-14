import React, {useContext} from 'react';
import checkLinkType from "../../utils/getLinkType";
import PropTypes from 'prop-types';
import FlashcardContext from "../../context/flashcard/flashcardContext";

const FlashcardItem = ({ flashcard }) => {
    const flashcardContext = useContext(FlashcardContext);
    const { deleteFlashcard, setCurrent, clearCurrent } = flashcardContext;

    const { id, frontText, backText, extraText, tags} = flashcard;

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

    const onDelete = () => {
        deleteFlashcard(id);
        clearCurrent();
    };

    return (
        <div className="card bg-light">
            {renderFrontText(frontText)}
            <h3 className="text-dark text-left"> {backText} </h3>
            {extraText && ( <h5 className="text-left"> {extraText} </h5>)}
            <ul className="list">
                {/*Jakoś to wypełnić/margines żeby ładniej wyglądało */}
                {tags.map(tag => <li key={tag}><span className="badge-primary">{tag}</span></li>)}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={() => setCurrent(flashcard)}>Edytuj</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Usuń</button>
            </p>
        </div>
    )
};

FlashcardItem.propTypes = {
    flashcard: PropTypes.object.isRequired,
};

export default FlashcardItem;