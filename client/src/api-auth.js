const API_URL = import.meta.env.VITE_API_URL;

// USER SIGNUP
const signup = async (user) => {
  try {
    let response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });

    return await response.json();
  } catch (err) {
    console.error("Signup error:", err);
    return { error: "Signup failed — server not reachable." };
  }
};

// USER SIGNIN
const signin = async (user) => {
  try {
    let response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });

    return await response.json();
  } catch (err) {
    console.error("Signin error:", err);
    return { error: "Signin failed — server not reachable." };
  }
};

// USER SIGNOUT
const signout = async () => {
  try {
    let response = await fetch(`${API_URL}/auth/signout`, {
      method: "GET",
      credentials: "include",
    });

    return await response.json();
  } catch (err) {
    console.error("Signout error:", err);
    return { error: "Signout failed — server not reachable." };
  }
};

export { signup, signin, signout };
