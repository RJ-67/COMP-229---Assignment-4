const create = async (project) => {
  try {
    let response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    return await response.json();
  } catch {
    return { error: "Could not reach server" };
  }
};

const list = async (signal) => {
  try {
    let response = await fetch("/api/projects", { signal });
    return await response.json();
  } catch {
    return { error: "Could not reach server" };
  }
};

const read = async (id, signal) => {
  try {
    let response = await fetch(`/api/projects/${id}`, { signal });  
    return await response.json();
  } catch {
    return { error: "Could not reach server" };
  }
};

const update = async (id, project) => {
  try {
    let response = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
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

    let response = await fetch(`/api/projects/${id}`, {
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
    console.error("Delete project error:", err);
    return { error: "Delete failed" };
  }
};



export { create, list, read, update, remove };
