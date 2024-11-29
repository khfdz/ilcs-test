import React, { useState } from "react";
import Car1 from "../images/car1.png";
import Car2 from "../images/car2.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { useBookingContext } from "../context/BookingContext";
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css';

const Banner1 = () => {
  const { bookingData, updateBookingData } = useBookingContext();
  const [entryDate, setEntryDate] = useState(bookingData.entryDate || null);
  const [exitDate, setExitDate] = useState(bookingData.exitDate || null);
  const [entryTime, setEntryTime] = useState(bookingData.entryTime || "10:00");
  const [exitTime, setExitTime] = useState(bookingData.exitTime || "10:00");

  const handleDateChange = (date, type) => {
    if (type === "entry") {
      setEntryDate(date);
      if (exitDate && date > exitDate) {
        setExitDate(null);
      }
    } else if (type === "exit") {
      setExitDate(date);
    }
  };

  const handleSearchClick = () => {
    if (entryDate && entryTime && exitDate && exitTime) {
      updateBookingData({
        entryDate,
        entryTime,
        exitDate,
        exitTime,
      });

      console.log("Booking Data Updated in Context: ", {
        entryDate,
        entryTime,
        exitDate,
        exitTime,
      });

      const targetElement = document.getElementById("booking-form");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      Swal.fire({
        title: 'Informasi Tidak Lengkap',
        text: 'Silakan pilih tanggal dan waktu parkir terlebih dahulu.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="relative bg-blue1 text-white py-12 px-6 overflow-hidden text-gilda -mt-4">
      <p className="text-center text-4xl font-extrabold mb-2 tracking-wide leading-tight animate__animated animate__fadeIn animate__delay-1s font-gilda">
        Cari parkir? Gak Perlu Pusing!
      </p>
      <p className="text-xl mb-8 text-center font-semibold text-indigo-100 ">
        Pesan parkir lebih mudah, hemat, dan nikmati kenyamanan tanpa stres!
      </p>

      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        <div className="relative flex-1 h-[300px]">
          <img
            src={Car1}
            alt="Car 1"
            className="w-[350px] absolute bottom-[0px] left-[30px] animate-car-reverse-left z-20"
          />

          <img
            src={Car2}
            alt="Car 2"
            className="w-[300px] absolute top-[-20px] right-[90px] animate-car-forward-right z-20"
          />
        </div>

        <div
          id="booking-form"
          className="bg-white text-gray-800 p-6 rounded-lg shadow-xl flex-1 max-w-[420px] mt-10 lg:mt-0"
        >
          <form className="grid grid-cols-1 gap-6">
            <p className="text-center text-lg font-semibold text-gray-700">
              Pesan Parkir Sekarang!
            </p>
            <div className="text-center text-lg font-semibold text-gray-700 border-b-2 border-dashed border-gray-700"></div>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center bg-gray-100 rounded-md p-3 shadow-sm">
                  <DatePicker
                    selected={entryDate}
                    onChange={(date) => handleDateChange(date, "entry")}
                    dateFormat="d MMMM yyyy"
                    className="flex-1 bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400"
                    placeholderText="Tanggal Masuk"
                  />
                  <FaCalendarAlt className="ml-2 text-gray-600" />
                </div>
              </div>
              <div className="flex-1 lg:mt-0 mt-4">
                <div className="flex items-center bg-gray-100 rounded-md p-3 shadow-sm">
                  <input
                    type="time"
                    id="entry-time"
                    value={entryTime}
                    onChange={(e) => setEntryTime(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400"
                    placeholder="18:00 WIB"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center bg-gray-100 rounded-md p-3 shadow-sm">
                  <DatePicker
                    selected={exitDate}
                    onChange={(date) => handleDateChange(date, "exit")}
                    dateFormat="d MMMM yyyy"
                    className="flex-1 bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400"
                    placeholderText="Tanggal Keluar"
                    minDate={entryDate}
                  />
                  <FaCalendarAlt className="ml-2 text-gray-600" />
                </div>
              </div>
              <div className="flex-1 lg:mt-0 mt-4">
                <div className="flex items-center bg-gray-100 rounded-md p-3 shadow-sm">
                  <input
                    type="time"
                    id="exit-time"
                    value={exitTime}
                    onChange={(e) => setExitTime(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleSearchClick}
                className="w-full bg-yellow2 text-black py-3 px-6 rounded-md font-semibold transition duration-300 ease-in-out transform hover:scale-105"
              >
                Cari Parkir
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner1;
