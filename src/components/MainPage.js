import React from "react"

export default function MainPage(props) {
    return (
        <div className="main-page">
            <h1 className="intro-title">Quizzical</h1>
            <span className="intro-description">Welcome to Quizzical</span>
            <button onClick={props.playable} className="button">Start quiz</button>
        </div>
    )
}