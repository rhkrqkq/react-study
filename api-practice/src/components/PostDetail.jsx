import { useEffect, useState } from "react";
import axios from "axios";

const BASE = "https://jsonplaceholder.typicode.com";

const PostDetail = () => {
	const [id, setId] = useState(1);
	const [post, setPost] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const load = async () => {
			setError(null);
			try {
				const { data } = await axios.get(`${BASE}/posts/${id}`); // Path Variable 은 템플릿 문자열로
				setPost(data);
			} catch (err) {
				if (axios.isAxiosError(err) && err.response?.status === 404) {
					setError(`${id}번 게시글은 존재하지 않습니다`);
				} else {
					setError("조회 실패");
				}
				setPost(null);
			}
		};
		load();
	}, [id]);

	return (
		<div>
			<h2>게시글 상세</h2>
			<input
				type="number"
				value={id}
				onChange={(e) => setId(Number(e.target.value))}
				min={1}
			/>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{post && (
				<article>
					<h3>{post.title}</h3>
					<p>{post.body}</p>
				</article>
			)}
		</div>
	);
};

export default PostDetail;
