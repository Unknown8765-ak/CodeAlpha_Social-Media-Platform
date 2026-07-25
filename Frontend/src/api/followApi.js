const API_URL = import.meta.env.VITE_API_URL;

export const toggleFollow = async (userId) => {
    const res = await fetch(
        `${API_URL}/follow/${userId}`,
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

export const getFollowers = async (userId) => {
    const res = await fetch(
        `${API_URL}/follow/followers/${userId}`,
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

export const getFollowing = async (userId) => {
    const res = await fetch(
        `${API_URL}/follow/following/${userId}`,
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