import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookingContext } from "../context/BookingContext";
import dataVehicle from "../data/DataVehicle.json";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import ParkingMap from "../components/ParkingMap";
import Navbar from "../components/Navbar";

const DateTimeInput = ({ label, selectedDate, handleDateChange, timeValue, handleTimeChange, minDate }) => (
  <div className="mt-4 flex space-x-4">
    <div className="w-1/2">
      <label className="block text-sm font-semibold">{label} Tanggal</label>
      <DatePicker
        selected={selectedDate instanceof Date ? selectedDate : null}
        onChange={handleDateChange}
        dateFormat="d MMMM yyyy"
        className="w-full border p-2 mt-2"
        placeholderText={`${label} Tanggal`}
        minDate={minDate}
        showTimeSelect={false}
      />
    </div>
    <div className="w-1/2">
      <label className="block text-sm font-semibold">{label} Waktu</label>
      <input
        type="time"
        value={timeValue}
        onChange={handleTimeChange}
        className="w-full border p-2 mt-2"
      />
    </div>
  </div>
);

const BookingPage = () => {
  const location = useLocation();
  const loc = location.state;
  const { bookingData, updateBookingData } = useBookingContext();

  const [brand, setBrand] = useState(bookingData.brand || "");
  const [type, setType] = useState(bookingData.type || "");
  const [vehicleSize, setVehicleSize] = useState(bookingData.vehicleSize || "");
  const [entryDate, setEntryDate] = useState(bookingData.entryDate ? new Date(bookingData.entryDate) : null);
  const [entryTime, setEntryTime] = useState(bookingData.entryTime || "");
  const [exitDate, setExitDate] = useState(bookingData.exitDate ? new Date(bookingData.exitDate) : null);
  const [exitTime, setExitTime] = useState(bookingData.exitTime || "");
  const [warningMessage, setWarningMessage] = useState("");
  const [invalidVehicleSize, setInvalidVehicleSize] = useState(false);

  const navigate = useNavigate();

  const getTypesByBrand = (brand) => {
    return dataVehicle.filter((v) => v.name.includes(brand));
  };

  const mapVehicleSize = (size) => {
    switch (size) {
      case "small":
        return "Kecil";
      case "medium":
        return "Sedang";
      case "large":
        return "Besar";
      default:
        return "";
    }
  };

  const getSizeByType = (type) => {
    const vehicle = dataVehicle.find((v) => v.type === type);
    return vehicle ? vehicle.size : "";
  };

  const calculatePrice = () => {
    if (!(entryDate instanceof Date) || !(exitDate instanceof Date) || !entryTime || !exitTime || !vehicleSize) {
      return 0;
    }

    const start = new Date(`${entryDate.toISOString().split('T')[0]}T${entryTime}`);
    const end = new Date(`${exitDate.toISOString().split('T')[0]}T${exitTime}`);

    const durationInMilliseconds = end - start;

    if (durationInMilliseconds <= 0) {
      return 0;
    }

    const durationInDays = Math.ceil(durationInMilliseconds / (1000 * 3600 * 24));

    const pricePerDay = loc?.pricePerDay?.[vehicleSize];

    if (!pricePerDay) {
      return 0;
    }

    return durationInDays * pricePerDay;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!entryDate || !entryTime || !exitDate || !exitTime) {
      setWarningMessage("Harap pilih tanggal dan waktu yang valid.");
      return;
    }

    const startDateTime = new Date(`${entryDate.toISOString().split('T')[0]}T${entryTime}`);
    const endDateTime = new Date(`${exitDate.toISOString().split('T')[0]}T${exitTime}`);

    if (endDateTime <= startDateTime) {
      setWarningMessage("Tanggal keluar tidak boleh lebih kecil atau sama dengan tanggal masuk.");
      return;
    }

    const bookingData = {
      brand,
      type,
      vehicleSize,
      entryDate: entryDate instanceof Date ? entryDate.toISOString().split('T')[0] : entryDate,
      entryTime,
      exitDate: exitDate instanceof Date ? exitDate.toISOString().split('T')[0] : exitDate,
      exitTime,
      locationName: loc?.name,
      totalPrice: calculatePrice(),
    };

    updateBookingData(bookingData);
    navigate("/biodata", { state: bookingData });
  };

  useEffect(() => {
    const validateVehicleSize = () => {
      if (vehicleSize && !loc?.vehicleSizes?.includes(vehicleSize)) {
        setInvalidVehicleSize(true);
        setWarningMessage("Kendaraan tidak sesuai dengan jenis kendaraan yang diperbolehkan.");
      } else {
        setInvalidVehicleSize(false);
        setWarningMessage("");
      }
    };

    if (vehicleSize) {
      validateVehicleSize();
    } else {
      setInvalidVehicleSize(false);
      setWarningMessage("");
    }
  }, [vehicleSize, loc?.vehicleSizes]);

  const brandList = Array.from(new Set(dataVehicle.map((v) => v.name)));

  const isParkingFull =
    loc?.parkedVehicles?.small +
      loc?.parkedVehicles?.medium +
      loc?.parkedVehicles?.large >=
    loc?.capacity;

  const isFormValid = brand && type && vehicleSize && entryDate && entryTime && exitDate && exitTime && !invalidVehicleSize && !isParkingFull;

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    setVehicleSize(getSizeByType(selectedType));
  };

  return (
    <div>
      <Navbar />
    
      <div className="container mx-auto p-4 mt-8">
        <div className="flex gap-8">
          <div className="flex-1 p-6 bg-white rounded-lg shadow-lg border">
            <h2 className="text-2xl text-blue1 font-semibold text-center mb-2">{loc?.name}</h2>
            <p
              className={` flex items-center justify-center w-[20%] mb-2 text-center text-xl font-bold text-white mx-auto ${
                isParkingFull ? "bg-red-500 rounded-md" : "rounded-md bg-green-500"
              }`}
            >
              {isParkingFull ? "Penuh" : "Tersedia"}
            </p>

            <ParkingMap location={loc} />

            <h3 className="text-blue1 mt-4 text-xl font-semibold text-center">
              Jenis Kendaraan yang Diperbolehkan
            </h3>

            <ul className="flex space-x-2 mt-2 justify-center items-center text-gray-600">
              {loc?.vehicleSizes?.map((size) => (
                <span key={size} className={`bg-${size === "small" ? "green" : size === "medium" ? "yellow" : "red"}-200 text-${size === "small" ? "green" : size === "medium" ? "yellow" : "red"}-700 px-3 py-1 rounded-md text-md font-semibold`}>
                  {mapVehicleSize(size)}
                </span>
              ))}
            </ul>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Harga Per Hari:</h3>
              {Object.entries(loc?.pricePerDay || {}).map(([key, value]) => (
                value > 0 && (
                  <p key={key} className="text-gray-600 mt-2">
                    <strong>Kendaraan {mapVehicleSize(key)}:</strong> Rp {value.toLocaleString()}
                  </p>
                )
              ))}
            </div>
            <p className="text-gray-600 mt-2">
              <strong>Jumlah Kendaraan yang Sudah Parkir:</strong>{" "}
              {loc?.parkedVehicles?.small +
                loc?.parkedVehicles?.medium +
                loc?.parkedVehicles?.large} / {loc?.capacity}
            </p>
          </div>

          <div className="w-96 p-6 bg-white rounded-lg shadow-lg border">
            <h3 className="text-2xl font-semibold mb-4">Form Pemesanan</h3>

            <form onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold">Merek Kendaraan</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full border p-2 mt-2"
                >
                  <option value="">Pilih Merek</option>
                  {brandList.map((b, index) => (
                    <option key={index} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold">Jenis Kendaraan</label>
                <select
                  value={type}
                  onChange={handleTypeChange}
                  className="w-full border p-2 mt-2"
                >
                  <option value="">Pilih Jenis</option>
                  {getTypesByBrand(brand).map((v, index) => (
                    <option key={index} value={v.type}>
                      {v.type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold">Ukuran Kendaraan</label>
                <input
                  type="text"
                  value={mapVehicleSize(vehicleSize)}
                  disabled
                  className="w-full border p-2 mt-2 bg-gray-100"
                />
              </div>

              <DateTimeInput
                label="Masuk"
                selectedDate={entryDate}
                handleDateChange={(date) => setEntryDate(date)}
                timeValue={entryTime}
                handleTimeChange={(e) => setEntryTime(e.target.value)}
                minDate={null}
              />

              <DateTimeInput
                label="Keluar"
                selectedDate={exitDate}
                handleDateChange={(date) => setExitDate(date)}
                timeValue={exitTime}
                handleTimeChange={(e) => setExitTime(e.target.value)}
                minDate={entryDate}
              />

              {warningMessage && (
                <p className="text-red-500 mt-2">{warningMessage}</p>
              )}

              <div className="mt-4">
                <p className="text-lg font-semibold">
                  Total Harga: Rp {(calculatePrice() || 0).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  className={`w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={!isFormValid}
                >
                  Lanjut Pengisian
                </button>
                <button
                  type="button"
                  className="w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => navigate("/")}
                >
                  Kembali
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
