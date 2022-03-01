import React, {useState} from "react"
import MainPage from "./components/MainPage";
import QuizPage from "./components/QuizPage";

export default function App() {
  const [play, setPlay] = useState(false)

  function togglePlay() {
    setPlay(true)
  }

  return (
    <main>
      <div className="background">
        <div className="square yellow"></div>
        <div className="square blue"></div>
      </div>
      {play ? <QuizPage /> : <MainPage playable={togglePlay} />}
    </main>
  );
}