import { useState } from "react";
import emotion1 from "./assets/emotion1.png";
import "./App.css";
import { getEmotionImgById } from "./util";

function App() {
	return (
		<>
			<div className="App"></div>
			<h1>어어 그래</h1>
			<img alt="감정1" src={getEmotionImgById(1)} />
			<img alt="감정2" src={getEmotionImgById(2)} />
			<img alt="감정3" src={getEmotionImgById(3)} />
			<img alt="감정4" src={getEmotionImgById(4)} />
			<img alt="감정5" src={getEmotionImgById(5)} />
		</>
	);
}

export default App;
