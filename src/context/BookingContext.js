// BookingContext.js
import React, { createContext, useState, useContext } from "react";

// Membuat Context
const BookingContext = createContext();

// Custom Hook untuk menggunakan Context
export const useBookingContext = () => useContext(BookingContext);

// Provider untuk Context
export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    entryDate: null, // Default tanggal masuk
    entryTime: "10:45", // Default waktu masuk
    exitDate: null, // Default tanggal keluar
    exitTime: "10:45", // Default waktu keluar
    brand: "", // Merek kendaraan
    type: "", // Jenis kendaraan
    vehicleSize: "", // Ukuran kendaraan
    totalPrice: 0, // Harga total
  });

  const updateBookingData = (newData) => {
    setBookingData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};
