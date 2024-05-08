import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmed: "",
  });

  async function registerUser(e: FormEvent) {
    e.preventDefault();
    const { email, name, password, passwordConfirmed } = data;
    try {
      const { data } = await axios.post("users/register", {
        name,
        email,
        password,
        passwordConfirmed,
      });
      if (data.error) {
        console.log(data);
      } else {
        setData({ name: "", email: "", password: "", passwordConfirmed: "" });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={registerUser}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <label htmlFor="passwordConfirmed">password Confirm</label>
        <input
          type="password"
          name="passwordConfirmed"
          id="passwordConfirmed"
          value={data.passwordConfirmed}
          onChange={(e) =>
            setData({ ...data, passwordConfirmed: e.target.value })
          }
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Register;
