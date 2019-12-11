import React from 'react';
import checkLinkType from "../../utils/getLinkType";
import PropTypes from 'prop-types';

const FlashcardItem = ({ flashcard }) => {
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

    return (
        <div className="card bg-light">
            {renderFrontText(frontText)}
            <h3 className="text-dark text-left"> {backText} </h3>
            {extraText && ( <h2 className="text-left"> {extraText} </h2>)}
            <ul className="list">
                {/*Jakoś to wypełnić/margines żeby ładniej wyglądało */}
                {tags.map(tag => <li><span className="badge-primary">{tag}</span></li>)}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm">Edytuj</button>
                <button className="btn btn-dark btn-sm">Usuń</button>
            </p>
        </div>
    )
};

FlashcardItem.propTypes = {
    flashcard: PropTypes.object.isRequired,
};

export default FlashcardItem;