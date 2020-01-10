import React, {useState} from 'react';
import checkLinkType from "../../utils/getLinkType";

const FlashcardStudentView = ({flashcard}) => {

    const {frontText, backText, extraText} = flashcard;

    const [flipped, setFlipped] = useState({
        flipped: false
    });

    const renderFrontText = (text) => {
        const result = checkLinkType(text);
        switch (result.type) {
            case 'image':
                return (<img src={text} alt="Obrazek"/>);
            case 'audio':
                return (
                    <audio controls>
                        <source src={text} type={`audio/${result.extension}`}/>
                    </audio>
                );
            case 'unsupported':
                return (<a href={text}>{text}</a>);
            default:
                return (<h3 className="text-dark text-left"> {text} </h3>);
        }
    };

    const flipFlashcard = () => {
        setFlipped(!flipped);
    };

    // Uczeń nie widzi tagów fiszki
    return (
        <div className="card bg-light" onClick={flipFlashcard}>
            {flipped
                ? (<div>
                    {renderFrontText(frontText)}
                </div>)
                : (<div>
                    <h3 className="text-dark text-left"> {backText} </h3>
                    {extraText && (<h5 className="text-left"> {extraText} </h5>)}
                </div>)}
        </div>
    )
};

export default FlashcardStudentView;