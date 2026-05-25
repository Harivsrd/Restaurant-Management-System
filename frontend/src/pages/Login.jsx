import { useState } from "react";
import { toast } from "react-toastify";

import API from "../services/api";

function Login() {

    const [formData, setFormData ] = useState({
        username:"",
        password:"",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post(
                "users/login/",
                formData
            );
            
            localStorage.setItem("token", response.data.access);

            toast.success("Login Successful");
            console.log(response.data);
            // window.location.href = "/";
        }
        catch(error){
            console.log(error);
            toast.error("Invalid Credentials");
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit} >
                <input type="text" name="username"
                 placeholder="Username" onChange={handleChange}
                />
                <input type="password" name="password"
                 placeholder="Password" onChange={handleChange}
                />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login;