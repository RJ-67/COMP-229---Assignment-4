// CREATE CONTACT
const create = async (contact) => {
  try {
    let response = await fetch("/api/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    return await response.json();
  } catch (err) {
    console.error("Create contact error:", err);
  }
};

// GET ALL CONTACTS
const list = async () => {
  try {
    let response = await fetch("/api/contacts", {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    console.error("List contacts error:", err);
    return [];
  }
};

// DELETE CONTACT
import auth from "../auth/auth-helper";

const remove = async (id) => {
  try {
    const jwt = auth.isAuthenticated();

    let response = await fetch(`/api/contacts/${id}`, {
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
    console.error("Delete contact error:", err);
    return { error: "Delete failed" };
  }
};


export { create, list, remove };
