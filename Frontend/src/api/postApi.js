const API_URL = import.meta.env.VITE_API_URL;

export const createPost = async (formData) => {
    const res = await fetch(
        `${API_URL}/posts`,
        {
            method: "POST",
            credentials: "include",
            body: formData,
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data;
};

export const getAllPosts = async () => {
    const res = await fetch(
        `${API_URL}/posts`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data;
};

export const getPostById = async (postId) => {
    const res = await fetch(
        `${API_URL}/posts/${postId}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data;
};

export const updatePost = async (postId, body) => {
    const res = await fetch(
        `${API_URL}/posts/${postId}`,
        {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data;
};

export const deletePost = async (postId) => {
    const res = await fetch(
        `${API_URL}/posts/${postId}`,
        {
            method: "DELETE",
            credentials: "include",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data;
};

export const getUserPosts = async (userId) => {
    const res = await fetch(
        `${API_URL}/posts/user/${userId}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data;
};