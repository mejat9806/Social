import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
    email: "",
  });
  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      //   const data = await loginApi({ email, password });
      //   console.log(data);
      const { data } = await axios.post("users/login", { email, password });
      if (data.error) {
        console.log(data.error);
      } else {
        setData({
          password: "",
          email: "",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={loginUser}>
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
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Login;
