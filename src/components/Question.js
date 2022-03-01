import React from "react"
import Answers from "./Answers"

export default function Question(props) {
    function createMarkup(text) {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(`<!doctype html><body>${text}</body>`, 'text/html').body.textContent;
        return decodedString
    }

    return (
        <div className="question-block">    
            <div className="question">
                {/* <h3 className="question-title">{convertToCorrectText(props.questionValue)}</h3> */}
                <h3 className="question-title">{createMarkup(props.questionValue)}</h3>
                <Answers 
                    chosenAnswer={props.chosenAnswer}
                    answers={props.answers.map(answer => createMarkup(answer))} 
                    correctAnswer={props.correctAnswer}
                    toggleAnswer={props.toggleAnswer} 
                    gameFeedback={props.gameFeedback}
                    questionId={props.questionId}
                />
            </div>
            <hr />
        </div>
    )
}