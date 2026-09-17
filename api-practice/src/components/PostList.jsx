import { useEffect, useState } from "react";
import axios from "axios";
import { getPosts } from "../api/postApi";

const BASE = "https://jsonplaceholder.typicode.com";

const PostList = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [userId, setUserId] = useState(undefined);

	// 수정: PUT /posts/{id}  (전체 필드를 보낸다)
	const handleEdit = async (post) => {
		const newTitle = window.prompt("새 제목", post.title);
		if (!newTitle) return;

		try {
			const data = await updatePost(post.id, {
				...post,
				title: newTitle,
			});

			// 서버 응답(수정된 객체)로 해당 항목만 교체 — 불변성 유지 (map)
			setPosts((prev) => prev.map((p) => (p.id === post.id ? data : p)));
		} catch {
			alert("수정 실패");
		}
	};

	// 삭제: DELETE /posts/{id}
	const handleDelete = async (id) => {
		if (!window.confirm("삭제할까요?")) return;

		try {
			await deletePost(id);
			// 성공하면 목록에서 제거 — filter
			setPosts((prev) => prev.filter((p) => p.id !== id));
		} catch {
			alert("삭제 실패");
		}
	};

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				const data = await getPosts(userId);
				setPosts(data);
			} catch (err) {
				setError("목록을 불러오지 못했습니다");
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [userId]);

	if (loading) return <p>로딩중...</p>;
	if (error) return <p style={{ color: "red" }}>{error}</p>;

	return (
		<div>
			<h2>게시글 목록</h2>
			<select
				value={userId ?? ""}
				onChange={(e) =>
					setUserId(
						e.target.value ? Number(e.target.value) : undefined,
					)
				}
			>
				<option value="">전체 작성자</option>
				<option value="1">작성자 1</option>
				<option value="2">작성자 2</option>
				<option value="3">작성자 3</option>
			</select>

			{loading && <p>로딩중...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						[{post.id}] {post.title}
						<button onClick={() => handleEdit(post)}>
							제목 수정
						</button>
						<button onClick={() => handleDelete(post.id)}>
							삭제
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PostList;
