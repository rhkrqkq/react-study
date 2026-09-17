import axios from "axios";

const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",   // 모든 요청 앞에 붙는 기본 URL
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
});

export default client;