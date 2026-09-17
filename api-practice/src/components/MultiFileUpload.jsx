import { useState } from "react";
import { uploadFiles } from "../api/fileApi";

const MultiFileUpload = () => {
	const [files, setFiles] = useState([]); // File 객체 배열
	const [title, setTitle] = useState("");
	const [uploading, setUploading] = useState(false);
	const [result, setResult] = useState(null);

	// FileList 는 배열이 아니므로 Array.from 으로 변환해서 보관
	const handleChange = (e) => {
		setFiles(Array.from(e.target.files ?? []));
	};

	const handleUpload = async () => {
		if (files.length === 0) {
			alert("파일을 선택하세요");
			return;
		}
		setUploading(true);
		try {
			const data = await uploadFiles(files, title);
			setResult(data);
		} catch {
			alert("업로드 실패");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div>
			<h2>여러 파일 업로드</h2>
			<input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="설명"
			/>
			<input
				type="file"
				multiple
				accept="image/*"
				onChange={handleChange}
			/>{" "}
			{/* multiple 추가 */}
			{files.length > 0 && (
				<ul>
					{files.map((f) => (
						<li key={f.name}>
							{f.name} ({(f.size / 1024).toFixed(1)} KB)
						</li>
					))}
				</ul>
			)}
			<button
				onClick={handleUpload}
				disabled={files.length === 0 || uploading}
			>
				{uploading ? "업로드 중..." : `${files.length}개 업로드`}
			</button>
			{result && (
				<div>
					<h3>서버가 받은 내용</h3>
					<p>form.title: {result.form.title}</p>
					<p>
						받은 파일:{" "}
						<img src={result.files.files} alt="서버 수신" />
					</p>
				</div>
			)}
		</div>
	);
};

export default MultiFileUpload;
