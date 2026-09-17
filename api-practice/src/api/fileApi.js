import axios from "axios";

// src/api/fileApi.js
export const uploadFile = async (file, title, onProgress) => {   // onProgress: 진행률 콜백 (선택)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    const { data } = await axios.post("https://httpbin.org/post", formData, {
        onUploadProgress: (event) => {
            if (event.total && onProgress) {
                onProgress(Math.round((event.loaded * 100) / event.total));
            }
        },
    });
    return data;
};

export const uploadFiles = async (files, title) => {
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));   // 같은 key 로 여러 번 append → 서버에서 배열로 받음
    formData.append("title", title);

    // postman-echo 는 files 를 파일명 기준으로 돌려준다 → 여러 파일 확인에 적합
    const { data } = await axios.post("https://postman-echo.com/post", formData);
    return data;
};

export const downloadFile = async (url, filename) => {
    const { data } = await axios.get(url, { responseType: "blob" });   // 응답을 Blob 으로

    const objectUrl = URL.createObjectURL(data);      // Blob → 임시 URL
    const a = document.createElement("a");            // 보이지 않는 a 태그를 만들어
    a.href = objectUrl;
    a.download = filename;                            // 저장할 파일명
    a.click();                                        // 클릭 → 브라우저 다운로드
    URL.revokeObjectURL(objectUrl);
};