import { useData } from "../useData.jsx";
export { HardGame };

function HardGame({ apiKey }) {
  console.log("in HardGame, apiKey", apiKey);
  const data = useData(
    `https://api.thecatapi.com/v1/images/search?limit=20&breed_ids=beng,soma,mco,sphy,tonk&api_key=${apiKey}`
  );
  if (data) {
    console.log(data);
    console.log("length: ", data.length);
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
