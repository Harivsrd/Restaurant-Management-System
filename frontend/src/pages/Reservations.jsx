import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

function Reservations() {

    const [loading, setLoading] = useState(false);
    
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
            toast.error("Guests must be greater than 0");
            return;
        }

        try {
            setLoading(true);
            await API.post("reservations/create/",formData);
            toast.success("Reservation Successful");
        }
        catch(error) {
            toast.error("Reservation Failed");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                    <h1>Book a Table</h1>
                    <input type="date" name="reservation_date" onChange={handleChange} />
                    <input type="time" name="reservation_time" onChange={handleChange} />
                    <input type="number" name="guests" onChange={handleChange} />

                    <button type="submit" disabled={loading}>
                        {
                            loading ? "Booking..." : "Reserve Table"
                        }
                    </button>
            </form>
        </div>
    )
}

export default Reservations;