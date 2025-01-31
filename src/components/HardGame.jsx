import { useState } from "react";
import { useData } from "../useData.jsx";
import { CatDisplay } from "./CatDisplay.jsx";
import { Header } from "./Header.jsx";
export { HardGame };

function HardGame({ apiKey, setPlayLevel, bestScore, setBestScore }) {
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("play");
  const [endMessage, setEndMessage] = useState("Let's Play!");

  const data = useData(
    `https://api.thecatapi.com/v1/images/search?limit=20&breed_ids=lihu,bali,pers,tvan,sava,abob,beng,soma,mco,sphy,tonk&api_key=${apiKey}`
  );
  if (data) {
    const isDisabled = status === "end";
    return (
      <>
        <Header
          status={status}
          endMessage={endMessage}
          isDisabled={isDisabled}
          score={score}
          bestScore={bestScore}
          setPlayLevel={setPlayLevel}
        />
        <CatDisplay
          data={data}
          status={status}
          setStatus={setStatus}
          isDisabled={isDisabled}
          setEndMessage={setEndMessage}
          score={score}
          setScore={setScore}
          bestScore={bestScore}
          setBestScore={setBestScore}
        />
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
}
/**
function displayImages(data) {
  let resArr = [];
  for (let i = 0; i < data.length; i++) {
    resArr.push(
      <button key={data[i].id} type="button">
        <img src={data[i].url} alt={`cat photo ${data[i].id}`} />
      </button>
    );
  }
  return resArr;
}
*/
