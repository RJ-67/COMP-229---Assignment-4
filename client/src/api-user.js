const API_URL = import.meta.env.VITE_API_URL;

const create = async (user) => {
  try {
    let response = await fetch(`${API_URL}/api/users/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (params, credentials) => {
  try {
    let response = await fetch(`${API_URL}/api/users/${params.userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (params, credentials, user) => {
  try {
    let response = await fetch(`${API_URL}/api/users/${params.userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: user,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

import auth from "../auth/auth-helper";

const remove = async (params) => {
  try {
    const jwt = auth.isAuthenticated();

    let response = await fetch(`${API_URL}/api/users/${params.userId}`, {
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
    console.log("Delete user error:", err);
    return { error: "Delete failed" };
  }
};

export { create, read, update, remove };
