import React, { useEffect, useState } from "react";

const TicketPriceFetcher = () => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicketPrice = async () => {
      try {
        const response = await fetch(
          "https://innovation-project-rain-or-shine-backend-drgugwd9a2djcsff.northeurope-01.azurewebsites.net/calculate_ticket_price"
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setPrice(data.ticket_price); // Assuming the response has a 'price' field
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketPrice();
  }, []); // Empty dependency array ensures this runs only once on load

  if (loading) {
    return <p>Ladataan lipun hintaa...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return <p>Ticket price today: {price}€</p>;
};

export default TicketPriceFetcher;
