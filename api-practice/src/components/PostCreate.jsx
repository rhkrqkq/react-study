import { useState } from "react";
import axios from "axios";

const BASE = "https://jsonplaceholder.typicode.com";

const PostCreate = ({ onCreated }) => {
	// onCreated: 등록 결과를 부모에게 알려줌
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault(); // 폼 기본 동작(새로고침) 막기
		if (!title.trim()) {
			alert("제목을 입력하세요");
			return;
		}
		const payload = { title, body, userId: 1 };

		setSubmitting(true);
		try {
			const { data, status } = await axios.post(`${BASE}/posts`, payload);
			console.log("상태:", status); // 201
			console.log("응답:", data); // { ...payload, id: 101 }
			onCreated(data);
			setTitle("");
			setBody("");
		} catch (err) {
			alert("등록 실패");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>게시글 등록</h2>
			<div>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="제목"
				/>
			</div>
			<div>
				<textarea
					value={body}
					onChange={(e) => setBody(e.target.value)}
					placeholder="내용"
				/>
			</div>
			<button type="submit" disabled={submitting}>
				{submitting ? "등록 중..." : "등록"}
			</button>
		</form>
	);
};

export default PostCreate;
