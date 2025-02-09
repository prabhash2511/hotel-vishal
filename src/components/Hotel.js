import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import logo from "../assets/logo.png";

const Hotel = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [hotels, setHotels] = useState([]);
  const [userName, setUserName] = useState("");
  const [bookings, setBookings] = useState([]); // To store room bookings

  // Fetch user's name from Firestore
  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      }
    };
    fetchUserName();
  }, []);

  // Fetch all bookings from Firestore
  useEffect(() => {
    const fetchBookings = async () => {
      const bookingsCollection = collection(db, "bookings");
      const bookingsSnapshot = await getDocs(bookingsCollection);
      const bookingsData = bookingsSnapshot.docs.map((doc) => doc.data());
      setBookings(bookingsData);
    };
    fetchBookings();
  }, []);

  // Dummy hotel data (3 for City A, 3 for City B, 3 for City C)
  const dummyHotels = [
    {
      id: 1,
      name: "Hotel A1",
      address: "123 Main St, City A",
      image: "https://lajollamom.com/wp-content/uploads/2019/01/Fairmont-Grand-Del-Mar-luxury-hotel-scaled.jpg",
    },
    {
      id: 2,
      name: "Hotel A2",
      address: "456 Elm St, City A",
      image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?cs=srgb&dl=dug-out-pool-hotel-poolside-1134176.jpg&fm=jpg",
    },
    {
      id: 3,
      name: "Hotel A3",
      address: "789 Oak St, City A",
      image: "https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 4,
      name: "Hotel B1",
      address: "123 Main St, City B",
      image: "https://q-xx.bstatic.com/xdata/images/hotel/max1200/13800549.jpg?k=ff50353d2dd34d4addadf1d09d633282e0a42eac9b6bb4a4930354832bc4d847&o=",
    },
    {
      id: 5,
      name: "Hotel B2",
      address: "456 Elm St, City B",
      image: "https://images.rosewoodhotels.com/is/image/rwhg/heroshot-punta-bonita-pool-and-beach-1",
    },
    {
      id: 6,
      name: "Hotel B3",
      address: "789 Oak St, City B",
      image: "https://media.architecturaldigest.com/photos/57e42deafe422b3e29b7e790/master/pass/JW_LosCabos_2015_MainExterior.jpg",
    },
    {
      id: 7,
      name: "Hotel C1",
      address: "123 Main St, City C",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/de/c6/a3/exterior.jpg?w=900&h=-1&s=1",
    },
    {
      id: 8,
      name: "Hotel C2",
      address: "456 Elm St, City C",
      image: "https://i.pinimg.com/originals/20/07/d6/2007d6dd4ca8f4b527d19c7baaefab7e.jpg",
    },
    {
      id: 9,
      name: "Hotel C3",
      address: "789 Oak St, City C",
      image: "https://www.hotels.club/wp-content/uploads/2016/10/hotel-header.jpg",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter hotels based on selected city
    const filteredHotels = dummyHotels.filter((hotel) =>
      hotel.address.includes(city)
    );
    setHotels(filteredHotels);
  };

  const handleBookRoom = async (hotelId, roomId) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to book a room.");
      return;
    }

    try {
      // Check if the room is already booked
      const bookingRef = doc(db, "bookings", `${hotelId}-${roomId}`);
      const bookingSnapshot = await getDoc(bookingRef);

      if (bookingSnapshot.exists()) {
        alert("This room is already booked.");
        return;
      }

      // Save the booking in Firestore
      await setDoc(bookingRef, {
        hotelId,
        roomId,
        userId: user.uid,
        timestamp: new Date(),
      });

      alert("Room booked successfully!");

      // Refresh the bookings list
      const bookingsCollection = collection(db, "bookings");
      const bookingsSnapshot = await getDocs(bookingsCollection);
      const bookingsData = bookingsSnapshot.docs.map((doc) => doc.data());
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error booking room:", error);
      alert(`Booking failed: ${error.message}`);
    }
  };

  const handleCancelBooking = async (hotelId, roomId) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to cancel a booking.");
      return;
    }

    try {
      const bookingRef = doc(db, "bookings", `${hotelId}-${roomId}`);
      const bookingSnapshot = await getDoc(bookingRef);

      if (!bookingSnapshot.exists()) {
        alert("This booking does not exist.");
        return;
      }

      if (bookingSnapshot.data().userId !== user.uid) {
        alert("You are not authorized to cancel this booking.");
        return;
      }

      await deleteDoc(bookingRef);
      alert("Booking canceled successfully!");

      // Refresh bookings
      const bookingsCollection = collection(db, "bookings");
      const bookingsSnapshot = await getDocs(bookingsCollection);
      const bookingsData = bookingsSnapshot.docs.map((doc) => doc.data());
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert(`Canceling failed: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        {/* Logo on the left */}
        <div style={styles.logo}>
          <img src={logo} alt="Logo" style={styles.logoImage} />
        </div>

        {/* Text in the middle */}
        <div style={styles.middleText}>
          {userName ? `Hello, ${userName}` : "Welcome to MyApp"}
        </div>

        {/* Logout and Home buttons on the right */}
        <div style={styles.authButtons}>
          <button onClick={() => navigate("/")} style={styles.button}>
            Home
          </button>
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </div>
      </div>

      {/* Search Form */}
      <div style={styles.searchForm}>
        <h2>Find Your Perfect Hotel</h2>
        <form onSubmit={handleSearch} style={styles.form}>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Select City</option>
            <option value="City A">City A</option>
            <option value="City B">City B</option>
            <option value="City C">City C</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
            required
          />
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Select Duration</option>
            <option value="1">1 Day</option>
            <option value="2">2 Days</option>
            <option value="3">3 Days</option>
          </select>
          <button type="submit" style={styles.button}>
            Search
          </button>
        </form>
      </div>

      {/* Hotel Results */}
      <div style={styles.hotelResults}>
        {hotels.map((hotel) => {
          const room1Booking = bookings.find(
            (b) => b.hotelId === hotel.id && b.roomId === "room1"
          );
          const room2Booking = bookings.find(
            (b) => b.hotelId === hotel.id && b.roomId === "room2"
          );

          return (
            <div key={hotel.id} style={styles.hotelCard}>
              <img src={hotel.image} alt={hotel.name} style={styles.hotelImage} />
              <h3 style={styles.hotelName}>{hotel.name}</h3>
              <p style={styles.hotelAddress}>{hotel.address}</p>

              {/* Room 1 */}
              <div style={styles.roomContainer}>
                <p>Room 1</p>
                {room1Booking ? (
                  room1Booking.userId === auth.currentUser?.uid ? (
                    <button
                      onClick={() => handleCancelBooking(hotel.id, "room1")}
                      style={styles.cancelButton}
                    >
                      Cancel Booking
                    </button>
                  ) : (
                    <button style={styles.bookedButton} disabled>
                      Booked
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => handleBookRoom(hotel.id, "room1")}
                    style={styles.roomButton}
                  >
                    Book Now
                  </button>
                )}
              </div>

              {/* Room 2 */}
              <div style={styles.roomContainer}>
                <p>Room 2</p>
                {room2Booking ? (
                  room2Booking.userId === auth.currentUser?.uid ? (
                    <button
                      onClick={() => handleCancelBooking(hotel.id, "room2")}
                      style={styles.cancelButton}
                    >
                      Cancel Booking
                    </button>
                  ) : (
                    <button style={styles.bookedButton} disabled>
                      Booked
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => handleBookRoom(hotel.id, "room2")}
                    style={styles.roomButton}
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Inline CSS for Hotel.js
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
  searchForm: {
    margin: "20px 0",
    width: "100%",
    maxWidth: "600px",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    flex: "1",
  },
  hotelResults: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    width: "100%",
    marginTop: "20px",
  },
  hotelCard: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    textAlign: "center",
  },
  hotelImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  hotelName: {
    margin: "10px 0",
  },
  hotelAddress: {
    margin: "5px 0",
  },
  roomContainer: {
    margin: "10px 0",
  },
  roomButton: {
    padding: "8px 16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  bookedButton: {
    padding: "8px 16px",
    backgroundColor: "#ff6666", // Light red
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "not-allowed",
  },
  cancelButton: {
    padding: "8px 16px",
    backgroundColor: "#dc3545", // Darker red for cancel
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Hotel;