import { useState } from "react";
import "../styles/App.css";
import { scrubAPIKey, looksLikeAKey } from "../utilities.js";
import { EasyGame } from "./EasyGame.jsx";
import { HardGame } from "./HardGame.jsx";

function App() {
  const [apiKey, setApiKey] = useState("");
  const [playLevel, setPlayLevel] = useState(0); // 1 is easiest level, 2 is hardest and needs api key
  const [bestScore, setBestScore] = useState(0);

  if (playLevel === 0) {
    return (
      <main className="landing">
        <h1>Welcome to the Cat Photo Memory Game!</h1>
        <p>
          This game has <span className="pay-attention">2 levels</span>. The
          current level will display 10 photos for you to click on. The goal is
          to click on a new photo each time without repeating your clicks. Each
          unique photo you click will score you a point. Try to beat your own
          best score which will be displayed on screen.
        </p>
        <p>
          However, if this is too easy for you, you can choose to{" "}
          <span className="pay-attention">play a harder</span> version of the
          game with 20 photos instead. You will need to provide your own API key
          though to continue to that level. You can get an API key for free from
          this website: <a href="https://thecatapi.com/">The Cat API</a>. Please{" "}
          <a href="https://thecatapi.com/">obtain one</a> to play the harder
          level of the game. (
          <em>
            another perk: the photos will much nicer than the easy level!
          </em>
          )
        </p>
        <form>
          <button onClick={() => setPlayLevel(1)}>Play Now!</button>
          <fieldset>
            <legend>Enter your API key to play harder level</legend>
            <label htmlFor="api-key">
              API Key:
              <input
                id="api-key"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </label>
            <button
              onClick={(e) => {
                console.log({ apiKey });
                let scrubbedKey = scrubAPIKey(apiKey);
                console.log({ scrubbedKey });
                if (looksLikeAKey(scrubbedKey)) {
                  setPlayLevel(2);
                } else {
                  alert("The key you entered doesn't seem to be valid.");
                }
              }}
            >
              Level up!
            </button>
          </fieldset>
        </form>
      </main>
    );
  } else if (playLevel === 1) {
    // easy level
    console.log("play easy");
    return (
      <EasyGame
        setPlayLevel={setPlayLevel}
        bestScore={bestScore}
        setBestScore={setBestScore}
      />
    );
  } else {
    // harder level
    console.log("play hard");
    return (
      <HardGame
        apiKey={apiKey}
        setPlayLevel={setPlayLevel}
        bestScore={bestScore}
        setBestScore={setBestScore}
      />
    );
  }
}
export default App;
