const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Registration failed");
    }

    return data;
};

export const loginUser = async (userData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
};

export const logoutUser = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Logout failed");
    }

    return data;
};

export const getCurrentUser = async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user");
    }

    return data;
};


export const searchUsers = async (query) => {

    const res = await fetch(
        `${API_URL}/users/search?query=${query}`,
        {
            credentials: "include",
        }
    );

    const data = await res.json();

    if (!res.ok) {

        throw new Error(data.message);

    }

    return data;

};

export const updateProfile = async (formData) => {

    const res = await fetch(
        `${API_URL}/users/profile`,
        {
            method: "PATCH",
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