import { useData } from "../useData.jsx";
export { EasyGame };

function EasyGame() {
  console.log("in EasyGame");
  const data = useData(`https://api.thecatapi.com/v1/images/search?limit=10`);
  if (data) {
    console.log(data);
    return <div className="cat-display">{displayImages(data)}</div>;
  } else {
    return <div>Loading...</div>;
  }
}

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
