import { useEffect, useState } from "react";

import API from "../services/api";

import "../styles/reservationhistory.css";

function ReservationHistory() {

  const [reservations, setReservations] =
    useState([]);

  useEffect(() => {

    fetchReservations();

  }, []);

  const fetchReservations = async () => {

    try {

      const response = await API.get(
        "reservations/history/"
      );

      setReservations(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="reservation-container">

      <h1>Reservation History</h1>

      {

        reservations.length === 0 ? (

          <p>No reservations found</p>

        ) : (

          reservations.map((reservation) => (

            <div
              className="reservation-card"
              key={reservation.id}
            >

              <h2>
                Reservation #{reservation.id}
              </h2>

              <p>
                Date:
                {" "}
                {reservation.reservation_date}
              </p>

              <p>
                Time:
                {" "}
                {reservation.reservation_time}
              </p>

              <p>
                Guests:
                {" "}
                {reservation.guests}
              </p>

            </div>
          ))
        )
      }

    </div>
  );
}

export default ReservationHistory;