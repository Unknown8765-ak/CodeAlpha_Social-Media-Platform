const API_URL = import.meta.env.VITE_API_URL;

export const toggleLike = async (postId) => {
    const res = await fetch(
        `${API_URL}/likes/${postId}`,
        {
            method: "POST",
            credentials: "include",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data;
};

export const getPostLikes = async (postId) => {
    const res = await fetch(
        `${API_URL}/likes/${postId}`,
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