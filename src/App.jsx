import "./App.css";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY

function App() {

const [catFact, setcatFact] = useState("");
const [catGif, setcatGif] = useState("");

const giphyAPI = (string) => {
  /* Fetching the data from the giphy API. */
  fetch(`https://api.giphy.com/v1/gifs/search?q=${string}&api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      /* Setting the state of the catGif variable to the url of the first gif in the data.data array. */
      setcatGif(data.data[0].images.original.url);
    });
};


  const callAPI = () => {
    fetch("https://catfact.ninja/fact")
      .then((res) => res.json())
      .then((data) => {
        /* Setting the state of the catFact variable to the data.fact. */
        setcatFact(data.fact);
        /* Calling the giphyAPI function and passing in the first three words of the cat fact. */
        giphyAPI(data?.fact?.split(" ", 3).join(" "));
      });
  };
  
  /* Calling the callAPI function when the component is mounted. */
  useEffect(callAPI, []);


  return (
    <div className="App">
      <h2>{catFact}</h2>
      <img src={catGif} alt="gif"/>
    </div>
  );
}

export default App;
