import { useState } from "react";
import { useData } from "../useData.jsx";
export { EasyGame };
import { CatDisplay } from "./CatDisplay.jsx";

function EasyGame({ setPlayLevel, bestScore, setBestScore }) {
  console.log("in EasyGame");
  const [score, setScore] = useState(0);
  const [selectedPics, setSelectedPics] = useState([]);
  const data = useData(`https://api.thecatapi.com/v1/images/search?limit=10`);
  const [status, setStatus] = useState("play");
  const [endMessage, setEndMessage] = useState("Let's Play!");

  function handleClick(e, shuffledData, setShuffledData) {
    console.log("clicked on ", e.target.id);
    //check if the id is in the selectedPics, if yes, game ends others increment their score
    // if incremented score is 10, they have won and the game ends
    if (selectedPics.includes(e.target.id)) {
      setStatus("end");
      setEndMessage("game ends, you lost");
    } else {
      setScore(score + 1);
      if (bestScore < score + 1) {
        setBestScore(score + 1);
      }
      let newArr = [...selectedPics];
      newArr.push(e.target.id);
      if (newArr.length === 10) {
        setStatus("end");
        setEndMessage("game ends, you won");
      } else {
        setSelectedPics(newArr); //update list of selected ids
        //shuffle
        let shuffler = [];
        let newShuffledArr = [];
        do {
          let rand = Math.floor(Math.random() * shuffledData.length);
          if (!shuffler.includes(rand)) {
            newShuffledArr.push(shuffledData[rand]);
            shuffler.push(rand);
          }
          console.log("newShuffledArr ->", newShuffledArr);
        } while (newShuffledArr.length !== shuffledData.length);
        setShuffledData(newShuffledArr);
      }
    }
  }

  if (data) {
    const isDisabled = status === "end";
    return (
      <>
        <h1 className={status}>{endMessage}</h1>
        <button
          id="play-again"
          className={isDisabled ? "show" : "hide"}
          onClick={() => {
            setPlayLevel(0);
          }}
        >
          Play Again?
        </button>
        <dl className="score-board">
          <dt>Score:</dt>
          <dd>{score}</dd>
          <dt>Best Score:</dt>
          <dd>{bestScore}</dd>
        </dl>
        <CatDisplay
          data={data}
          handleClick={handleClick}
          status={status}
          isDisabled={isDisabled}
        />
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
}
