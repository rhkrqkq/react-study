import { useState, useEffect } from "react";
import { uploadFile, downloadFile } from "../api/fileApi";

const FileUpload = () => {
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [title, setTitle] = useState("");
	const [uploading, setUploading] = useState(false);
	const [result, setResult] = useState(null);
	const [percent, setPercent] = useState(0);

	const handleChange = (e) => {
		const selected = e.target.files?.[0] ?? null; // files 는 FileList, 첫 번째만
		setFile(selected);
	};

	const handleUpload = async () => {
		if (!file) {
			alert("파일을 선택하세요");
			return;
		}
		setUploading(true);
		try {
			const data = await uploadFile(file, title);
			setResult(data);
		} catch {
			alert("업로드 실패");
		} finally {
			setUploading(false);
		}
	};

	// file 이 바뀔 때마다 미리보기 URL 생성 / 정리
	useEffect(() => {
		if (!file) {
			setPreview(null);
			return;
		}
		const url = URL.createObjectURL(file); // 브라우저 메모리의 파일을 가리키는 임시 URL
		setPreview(url);
		return () => URL.revokeObjectURL(url); // 언마운트/교체 시 메모리 해제
	}, [file]);

	return (
		<div>
			<h2>파일 업로드</h2>
			<input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="설명"
			/>
			<input type="file" accept="image/*" onChange={handleChange} />
			{preview && (
				<img
					src={preview}
					alt="미리보기"
					style={{ maxWidth: 300, display: "block" }}
				/>
			)}

			<button onClick={handleUpload} disabled={!file || uploading}>
				{uploading ? "업로드 중..." : "업로드"}
			</button>

			<button
				onClick={() =>
					downloadFile("https://httpbin.org/image/png", "sample.png")
				}
			>
				다운로드
			</button>

			{uploading && (
				<div>
					<progress value={percent} max={100} /> {percent}%
				</div>
			)}

			{result && (
				<div>
					<h3>서버가 받은 내용</h3>
					<p>form.title: {result.form.title}</p>
					<p>파일 키: {Object.keys(result.files).join(", ")}</p>
					{/* 서버가 돌려준 base64 이미지를 그대로 표시 → 정말 전송됐는지 확인 */}
					{result.files.file && (
						<img
							src={result.files.file}
							alt="서버 수신"
							style={{ maxWidth: 200 }}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default FileUpload;
