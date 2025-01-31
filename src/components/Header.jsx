export { Header };

function Header({
  status,
  endMessage,
  isDisabled,
  score,
  bestScore,
  setPlayLevel,
}) {
  return (
    <header>
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
    </header>
  );
}
