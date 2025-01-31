import { useState } from "react";
import { useData } from "../useData.jsx";
import { CatDisplay } from "./CatDisplay.jsx";
import { Header } from "./Header.jsx";
export { EasyGame };

function EasyGame({ setPlayLevel, bestScore, setBestScore }) {
  const [score, setScore] = useState(0);
  const data = useData(`https://api.thecatapi.com/v1/images/search?limit=10`);
  const [status, setStatus] = useState("play");
  const [endMessage, setEndMessage] = useState("Let's Play!");

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
