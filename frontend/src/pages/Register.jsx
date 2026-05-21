import { useState } from "react";
import API from "../services/api";

function Register() {

    const [formData, setFormData ] = useState({
        username:"",
        email:"",
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
                "users/register/",
                formData
            );
            console.log(response.data);
            alert("Registration Successful");
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={handleSubmit} >
                <input type="text" name="username"
                 placeholder="Username" onChange={handleChange}
                />
                <input type="email" name="email"
                 placeholder="Email" onChange={handleChange}
                />
                <input type="password" name="password"
                 placeholder="Password" onChange={handleChange}
                />
                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    )

}

export default Register;