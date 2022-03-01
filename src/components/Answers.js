import React from "react"

export default function Answers(props) {
    const answerSection = props.answers.map((answer, i) => {
        let resultStyling 
        // Firstly need to check if the answer is the chosen one
        if (answer === props.chosenAnswer) {
            // If our chosen answer is the correct answer, our answer is highlighted in light green color
            if (props.chosenAnswer === props.correctAnswer) resultStyling = "correct-answer"
            // If our chosen answer is the incorrect answer, our answer is highlighted in light red color
            else resultStyling = "wrong-answer"
        // Highlighting the correct answer, if we didn't choose the correct answer
        } else if (answer === props.correctAnswer) resultStyling = "correct-answer"
        
        return (<div 
            key={i} 
            // On the end of the game the user isn't able to click on any of the displayed answers
            onClick={!props.gameFeedback && (() => props.toggleAnswer(props.questionId, answer))} 
            // Checking if the answer is the chosen one, if so highlight style is applied to its class
            className={
                props.gameFeedback ?
                `answer ${resultStyling}` :
                `answer ${props.chosenAnswer === answer ? "highlight" : ""}`
            }
        >
            {answer}
        </div>)
    })
    return (
        <div className="answers">
            {answerSection}
        </div>
    )
}