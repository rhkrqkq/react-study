import client from "./client";

export const getPosts = async (userId, limit = 10) => {
    const { data } = await client.get("/posts", { params: { userId, _limit: limit } });
    return data;
};

export const getPost = async (id) => {
    const { data } = await client.get(`/posts/${id}`);
    return data;
};

export const createPost = async (post) => {
    const { data } = await client.post("/posts", post);
    return data;
};

export const updatePost = async (id, post) => {
    const { data } = await client.put(`/posts/${id}`, post);
    return data;
};

export const deletePost = async (id) => {
    await client.delete(`/posts/${id}`);
};