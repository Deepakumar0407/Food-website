import { useState } from "react";
import mealsImage from '../../assets/meals.jpg';
import axios from "axios";
import {useNavigate} from "react-router-dom";

  const Register = () => {
    const [data, setData] = useState({
      name: "",
      address: "",
      email: "",
      password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleChange = ({ currentTarget: input }) => {
      setData({ ...data, [input.name]: input.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const url = "http://localhost:3001/register";
        const { data: res } = await axios.post(url, data);
        navigate("/");
        console.log(res.message);
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
        <h1>Register</h1>
        <label>Name</label>
        <input
							type="text"
							placeholder="Name"
							name="name"
							onChange={handleChange}
							value={data.name}
							required
						/>
        <label>Address</label>
        <textarea rows='10'
          required
          name="address"
          value={data.address}
          onChange={handleChange}
        ></textarea>
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
            {error && <div>{error}</div>}
        <a className="btn" href="http://localhost:3000/" target="_self"><button type="button">Login</button></a>
        <button type="submit">
							Sing Up
				</button>
      </form>
    </div>
    </div>
    
  );
}
 
export default Register;