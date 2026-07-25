const API_URL = import.meta.env.VITE_API_URL;

export const getPostComments = async (postId) => {
    const res = await fetch(
        `${API_URL}/comments/${postId}`,
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

export const addComment = async (postId, comment) => {
    const res = await fetch(
        `${API_URL}/comments/${postId}`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comment,
            }),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data;
};

export const deleteComment = async (commentId) => {
    const res = await fetch(
        `${API_URL}/comments/${commentId}`,
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