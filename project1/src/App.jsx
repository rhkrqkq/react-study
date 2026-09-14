import Viewer from "./component/Viewer.jsx";
import Controller from "./component/Controller.jsx";
import Even from "./component/Even.jsx";
import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
	console.log("App렌더링");

	// const: state변수, setCount: setter함수
	const [count, setCount] = useState(0);
	const [text, setText] = useState("");
	// 이벤트핸들러 : setCount함수를 호출하는 함수
	const handleSetCount = (value) => {
		setCount(count + value);
	};

	const handleSetText = (e) => {
		setText(e.target.value);
	};

	const didMountRef = useRef(false);

	useEffect(() => {
		if (!didMountRef.current) {
			didMountRef.current = true;
			return;
		} else {
			console.log("컴포넌트 업데이트");
		}
	}); // useEffect(콜백, 의존성배열) : 의존성배열에 있는 값 변경될때마다 콜백함수 실행

	useEffect(() => {
		console.log("컴포넌트 마운트");
	}, []); // 의존성 배열 비어있으면 마운트될때만 실행

	useEffect(() => {
		const intervalId = setInterval(() => {
			console.log("깜빡");
		}, 1000);

		return () => {
			console.log("클린업");
			clearInterval(intervalId);
		};
	});

	return (
		<>
			<div className="App">
				<h1>Simple Counter</h1>
				<section>
					<input value={text} onChange={handleSetText} />
				</section>
				<section>
					<Viewer count={count} />
					{count % 2 === 0 && <Even />}
				</section>
				<section>
					<Controller handleSetCount={handleSetCount} />
				</section>
			</div>
		</>
	);
}

export default App;
