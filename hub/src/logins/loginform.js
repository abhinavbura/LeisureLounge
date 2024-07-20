import { useState } from "react";
import axios from "axios";
export default function Loginform({ setchange, setmessage }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here (e.g., send data to server)
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        formData
      );
      alert(response.data.message);
      setmessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          required
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          required
          onChange={handleInputChange}
        />
        <input type="submit" value="Login" onClick={handleSubmit} />
      </form>
      <br />
      Don't have an account?{" "}
      <a href="#" onClick={() => setchange("signup")}>
        Sign up
      </a>
    </div>
  );
}
