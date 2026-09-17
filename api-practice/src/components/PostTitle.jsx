import { useEffect, useState } from "react";

const PostTitle = () => {
	const [title, setTitle] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const load = async () => {
			try {
				const res = await fetch(
					"https://jsonplaceholder.typicode.com/posts/1",
				);
				if (!res.ok) {
					throw new Error(`HTTP ${res.status}`); // fetch 는 404/500 을 에러로 안 던지므로 직접 던짐
				}
				const data = await res.json();
				setTitle(data.title);
			} catch (err) {
				setError("데이터를 불러오지 못했습니다");
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	if (loading) return <p>로딩중...</p>;
	if (error) return <p style={{ color: "red" }}>{error}</p>;
	return <h2>{title}</h2>;
};

export default PostTitle;
