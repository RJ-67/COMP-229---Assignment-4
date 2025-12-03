const API_URL = import.meta.env.VITE_API_URL;

const create = async (qualification) => {
  try {
    const response = await fetch(`${API_URL}/api/qualifications`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(qualification),
    });
    return await response.json();
  } catch {
    return { error: "Could not reach server" };
  }
};

const list = async (signal) => {
  try {
    const response = await fetch(`${API_URL}/api/qualifications`, { signal });
    return await response.json();
  } catch {
    return { error: "Could not reach server" };
  }
};

const read = async (id, signal) => {
  try {
    const response = await fetch(`${API_URL}/api/qualifications/${id}`, {
      signal,
    });
    return await response.json();
  } catch {
    return { error: "Could not reach server" };
  }
};

const update = async (id, qualification) => {
  try {
    const response = await fetch(`${API_URL}/api/qualifications/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(qualification),
    });
    return await response.json();
  } catch {
    return { error: "Could not reach server" };
  }
};

import auth from "../auth/auth-helper";

const remove = async (id) => {
  try {
    const jwt = auth.isAuthenticated();

    let response = await fetch(`${API_URL}/api/qualifications/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt?.token}`,
      },
      credentials: "include",
    });

    return await response.json();
  } catch (err) {
    console.error("Delete qualification error:", err);
    return { error: "Delete failed" };
  }
};

export { create, list, read, update, remove };
