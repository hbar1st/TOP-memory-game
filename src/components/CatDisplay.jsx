import { useState } from "react";
export { CatDisplay };

function CatDisplay({
  data,
  status,
  setStatus,
  setEndMessage,
  score,
  setScore,
  bestScore,
  setBestScore,
  isDisabled,
}) {
  const [shuffledData, setShuffledData] = useState([...data]);

  const [selectedPics, setSelectedPics] = useState([]);

  function displayImages(shuffledData) {
    function handleClick(e) {
      //check if the id is in the selectedPics, if yes, game ends others increment their score
      // if incremented score is 10, they have won and the game ends
      if (selectedPics.includes(e.target.id)) {
        setStatus("end");
        setEndMessage(
          "Uh-oh! The End! You clicked twice on one of the pictures!"
        );
      } else {
        setScore(score + 1);
        if (bestScore < score + 1) {
          setBestScore(score + 1);
        }
        let newArr = [...selectedPics];
        newArr.push(e.target.id);
        if (newArr.length === shuffledData.length) {
          setStatus("end");
          setEndMessage(
            "Wow! You're amazing at this! You remembered everything you clicked on!"
          );
        } else {
          setSelectedPics(newArr); //update list of selected ids
          //shuffle
          let shuffler = []; //keeps track of random indexes we've used up so far
          let newShuffledArr = [];
          do {
            let rand = Math.floor(Math.random() * shuffledData.length);
            if (!shuffler.includes(rand)) {
              newShuffledArr.push(shuffledData[rand]);
              shuffler.push(rand);
            }
          } while (newShuffledArr.length !== shuffledData.length);
          setShuffledData(newShuffledArr);
        }
      }
    }

    let resArr = [];
    for (let i = 0; i < shuffledData.length; i++) {
      resArr.push(
        <button
          onClick={handleClick}
          id={shuffledData[i].id}
          key={shuffledData[i].id}
          type="button"
          disabled={isDisabled}
        >
          <img
            id={shuffledData[i].id}
            src={shuffledData[i].url}
            alt={`cat photo ${shuffledData[i].id}`}
          />
        </button>
      );
    }
    return resArr;
  }

  return (
    <div className={"cat-display " + status}>{displayImages(shuffledData)}</div>
  );
}
