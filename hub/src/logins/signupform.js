import { useState } from "react";
import axios from "axios";
export default function Signup({ setchange, setmessage }) {
  const [formData, setformdata] = useState({
    username: "",
    password: "",
    retype: "",
    gmail: "",
  });
  const handlechange = (event) => {
    const { name, value } = event.target;
    setformdata({
      ...formData,
      [name]: value,
    });
  };
  const handlesubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    if (formData.password !== formData.retype) {
      alert("passwords doesnt match");
    } else {
      try {
        const response = await axios.post("http://localhost:8080/api/adduser", {
          username: formData.username,
          password: formData.password,
        });
        alert(response.data.message);
        setmessage(response.data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>SignUp</h2>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handlechange}
          value={formData.username}
        />
        <input
          type="gmail"
          name="gmail"
          placeholder="Gmail"
          required
          onChange={handlechange}
          value={formData.gmail}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handlechange}
          value={formData.password}
        />
        <input
          type="password"
          name="retype"
          placeholder="re-type Password"
          required
          onChange={handlechange}
          value={formData.retype}
        />
        <input type="submit" value="Signup" onClick={handlesubmit} />
      </form>
      <br />
      Have an account?
      <a href="#" onClick={() => setchange("login")}>
        Login
      </a>
    </div>
  );
}
