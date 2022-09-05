import { useState } from "react";
import mealsImage from '../../assets/meals.jpg';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Create = () => {
  const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3001/login";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/Main";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

  return (
    <div>
      <div className="Img">
      <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    <div className="create">
      <form className="form_login" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Email ID</label>
        <input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
						/>
        <label>Password</label>
        <input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
						/>
        <button type="submit"> Sing In </button>
        <a className="btn" href="http://localhost:3000/Register" target="_self"><button type="button">Register</button></a>
      </form>
    </div>
    </div>
    
  );
}
 
export default Create;