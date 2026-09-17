import { useEffect, useState } from "react";

const FetchDemo = () => {
	const [title, setTitle] = useState("");

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts/1")
			.then((response) => response.json()) // 1) 응답 본문(문자열)을 JSON 객체로 변환 (이것도 Promise)
			.then((data) => setTitle(data.title)) // 2) 변환된 객체를 state 에 저장
			.catch((error) => console.error(error));
	}, []);

	return <h2>{title}</h2>;
};

export default FetchDemo;
