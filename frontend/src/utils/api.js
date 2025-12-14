export const getToken = () => localStorage.getItem("token") || "";

export const loginUser = async (email, password) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) localStorage.setItem("token", data.token);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const signupUser = async (userData) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.ok) localStorage.setItem("token", data.token);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
