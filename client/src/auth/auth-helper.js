

const auth = {
  // Save token + user data
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      localStorage.setItem("jwt", JSON.stringify(jwt));
    cb();
  },

  // Check if user is signed in
  isAuthenticated() {
    if (typeof window === "undefined") return false;

    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  },

  // Logout
  clearJWT(cb) {
    if (typeof window !== "undefined")
      localStorage.removeItem("jwt");
    cb();
  }
};

export default auth;
