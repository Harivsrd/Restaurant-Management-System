import { useState } from "react";

import API from "../services/api";

function Reservations() {
    
    const [formData, setFormData] = useState({
        reservation_date: "",
        reservation_time: "",
        guests: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.guests <= 0) {
            alert("Guests must be greater than 0");
            return;
        }

        try {
            await API.post("reservations/create/",formData);
        }
        catch(error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                    <h1>Book a Table</h1>
                    <input type="date" name="reservation_date" onChange={handleChange} />
                    <input type="time" name="reservation_time" onChange={handleChange} />
                    <input type="number" name="guests" onChange={handleChange} />

                    <button type="submit">Reserve Table</button>
            </form>
        </div>
    )
}

export default Reservations;