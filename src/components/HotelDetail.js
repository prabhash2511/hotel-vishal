import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const HotelDetail = () => {
  const { id } = useParams(); // Get hotel ID from URL
  const navigate = useNavigate();

  // Dummy hotel data (replace with actual API call)
  const dummyHotels = [
    {
      id: 1,
      name: "Hotel A1",
      address: "123 Main St, City A",
      image: "https://via.placeholder.com/600x400",
      description: "Luxury hotel with a great view.",
      price: "$200 per night",
    },
    {
      id: 2,
      name: "Hotel A2",
      address: "456 Elm St, City A",
      image: "https://via.placeholder.com/600x400",
      description: "Comfortable and affordable stay.",
      price: "$150 per night",
    },
    {
      id: 3,
      name: "Hotel A3",
      address: "789 Oak St, City A",
      image: "https://via.placeholder.com/600x400",
      description: "Best for business travelers.",
      price: "$180 per night",
    },
    {
      id: 4,
      name: "Hotel B1",
      address: "123 Main St, City B",
      image: "https://via.placeholder.com/600x400",
      description: "Luxury hotel with a great view.",
      price: "$200 per night",
    },
    {
      id: 5,
      name: "Hotel B2",
      address: "456 Elm St, City B",
      image: "https://via.placeholder.com/600x400",
      description: "Comfortable and affordable stay.",
      price: "$150 per night",
    },
    {
      id: 6,
      name: "Hotel B3",
      address: "789 Oak St, City B",
      image: "https://via.placeholder.com/600x400",
      description: "Best for business travelers.",
      price: "$180 per night",
    },
    {
      id: 7,
      name: "Hotel C1",
      address: "123 Main St, City C",
      image: "https://via.placeholder.com/600x400",
      description: "Luxury hotel with a great view.",
      price: "$200 per night",
    },
    {
      id: 8,
      name: "Hotel C2",
      address: "456 Elm St, City C",
      image: "https://via.placeholder.com/600x400",
      description: "Comfortable and affordable stay.",
      price: "$150 per night",
    },
    {
      id: 9,
      name: "Hotel C3",
      address: "789 Oak St, City C",
      image: "https://via.placeholder.com/600x400",
      description: "Best for business travelers.",
      price: "$180 per night",
    },
  ];

  const hotel = dummyHotels.find((h) => h.id === parseInt(id));

  if (!hotel) {
    return <div>Hotel not found!</div>;
  }

  const handleBookNow = () => {
    alert(`Booking ${hotel.name} for ${hotel.price}`);
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        {/* Logo on the left */}
        <div style={styles.logo}>
          <img
            src="https://via.placeholder.com/150x50" // Replace with your logo image URL
            alt="Logo"
            style={styles.logoImage}
          />
        </div>

        {/* Text in the middle */}
        <div style={styles.middleText}>Hotel Booking System</div>

        {/* Home button on the right */}
        <div style={styles.authButtons}>
          <button onClick={() => navigate("/")} style={styles.button}>
            Home
          </button>
        </div>
      </div>

      {/* Hotel Details */}
      <div style={styles.hotelDetail}>
        <img src={hotel.image} alt={hotel.name} style={styles.hotelImage} />
        <h2 style={styles.hotelName}>{hotel.name}</h2>
        <p style={styles.hotelAddress}>{hotel.address}</p>
        <p style={styles.hotelDescription}>{hotel.description}</p>
        <p style={styles.hotelPrice}>{hotel.price}</p>
        <button onClick={handleBookNow} style={styles.bookButton}>
          Book Now
        </button>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          Back to Hotels
        </button>
      </div>
    </div>
  );
};

// Inline CSS for HotelDetail.js
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  logoImage: {
    height: "50px",
  },
  middleText: {
    fontSize: "18px",
  },
  authButtons: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  hotelDetail: {
    textAlign: "center",
    marginTop: "20px",
  },
  hotelImage: {
    width: "100%",
    maxWidth: "600px",
    height: "auto",
    borderRadius: "5px",
  },
  hotelName: {
    margin: "10px 0",
  },
  hotelAddress: {
    margin: "5px 0",
  },
  hotelDescription: {
    margin: "10px 0",
  },
  hotelPrice: {
    margin: "10px 0",
    fontSize: "18px",
    fontWeight: "bold",
  },
  bookButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default HotelDetail;