import React, {useState, useEffect} from "react"
import Question from "./Question"

export default function QuizPage(props) {
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const [totalPoints, setTotalPoints] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [newGameData, setNewGameData] = useState(1)

    function shuffleAnswers(answers){
        for (let i = answers.length - 1; i > 0; i--) {
            let rand = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[rand]] = [answers[rand], answers[i]]
        }
        return answers
    }

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple")
        .then(res => res.json())
        .then(data => setData(data.results.map(({question, correct_answer, incorrect_answers}, i) => {
            return {
                "id": (i + 1),
                "question": question,
                "answers": shuffleAnswers([correct_answer, ...incorrect_answers]),
                "correctAnswer": correct_answer,
                "chosenAnswer": ""
            }
        })))
    }, [newGameData])
    
    
    function toggleAnswer(questionId, answer) {
        setData(oldData => oldData.map(question => {
            if (question.id === questionId) {
                return {
                    ...question,
                    "chosenAnswer": answer
                }
            } else {
                return {...question}
            }
        }))
    } 

    function restartGame() {
        // Reseting all game properties
        setError("")
        setTotalPoints(0)
        setGameOver(false)
        setNewGameData(old => old+=1)
    }

    function checkAnswers() {
        // Reseting error, because checking here if some answer isn't answered, if not the error is set and it appears on the screen
        setError("")
        data.forEach(question => {
            if (question.chosenAnswer === "") {
                setError("You have to answer all the questions in the quiz")
            }
        })
        if (error === "") {
            const userAnswers = data.map(question => question.chosenAnswer)
            const correctAnswers = data.map(question => question.correctAnswer)

            // Comparing correct answers with user answers
            correctAnswers.forEach((answer, i) => {
                const userAnswer = userAnswers[i]
                // Counting total points user will get
                if (answer === userAnswer) setTotalPoints(prevTotalPoints => prevTotalPoints+=1)
            })
            setGameOver(true)
        }
    }

    const questionsSection = (
        data.map(question =>  {
            return <Question 
                        key={question.id} 
                        questionValue={question.question}
                        chosenAnswer={question.chosenAnswer}
                        answers={question.answers}
                        correctAnswer={question.correctAnswer}
                        toggleAnswer={toggleAnswer}
                        gameFeedback={gameOver && !error}
                        questionId={question.id}
                    />
        })
    )

    return (
        <div className="quiz-page">
            {questionsSection}
            {error && <p className="error-msg">{error}</p>}
            <button 
                onClick={gameOver && !error ? restartGame : checkAnswers} 
                className="button end-button"
                >
            {gameOver && !error ? "Play again" : "Check answers"}
            </button>
            {gameOver && !error && <p>You scored {totalPoints}/5 correct answers</p>}
        </div>
    )
}