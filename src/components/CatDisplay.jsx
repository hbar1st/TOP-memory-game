import { useState } from "react";
export { CatDisplay };

function CatDisplay({ data, handleClick, status, isDisabled }) {
  const [shuffledData, setShuffledData] = useState([...data]);

  function displayImages(shuffledData) {
    
    let resArr = [];
    for (let i = 0; i < shuffledData.length; i++) {
      resArr.push(
        <button
          onClick={(e) => handleClick(e, shuffledData, setShuffledData)}
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

  return <div className={'cat-display '+status}>{displayImages(shuffledData)}</div>;
}
