import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dataVehicle from "../data/DataVehicle.json";
import "react-datepicker/dist/react-datepicker.css";
import VehicleInput from "../components/VehicleInput";
import DateTimePicker from "../components/DateTimePicker";
import ParkingMap from "../components/ParkingMap";

const BookingPage = () => {
  const location = useLocation();
  const loc = location.state;

  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [vehicleSize, setVehicleSize] = useState("");
  const [entryDate, setEntryDate] = useState(null);
  const [entryTime, setEntryTime] = useState(null);
  const [exitDate, setExitDate] = useState(null);
  const [exitTime, setExitTime] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");
  const [invalidVehicleSize, setInvalidVehicleSize] = useState(false);

  const navigate = useNavigate();

  const getTypesByBrand = (brand) => {
    return dataVehicle.filter((v) => v.name.includes(brand));
  };

  const getSizeByType = (type) => {
    const vehicle = dataVehicle.find((v) => v.type === type);
    return vehicle ? vehicle.size : "";
  };

  const calculatePrice = () => {
    if (!entryDate || !exitDate || !entryTime || !exitTime || !vehicleSize) {
      return 0;
    }

    const start = new Date(entryDate);
    const end = new Date(exitDate);

    const [entryHour, entryMinute] = entryTime.split(":");
    const [exitHour, exitMinute] = exitTime.split(":");

    start.setHours(entryHour, entryMinute);
    end.setHours(exitHour, exitMinute);

    const durationInMilliseconds = end - start;

    if (durationInMilliseconds <= 0) {
      return 0;
    }

    const durationInDays = Math.ceil(
      durationInMilliseconds / (1000 * 3600 * 24)
    );

    const pricePerDay = loc?.pricePerDay?.[vehicleSize];

    if (!pricePerDay) {
      return 0;
    }

    const totalPrice = durationInDays * pricePerDay;
    return totalPrice;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const startDateTime = new Date(`${entryDate}T${entryTime}`);
    const endDateTime = new Date(`${exitDate}T${exitTime}`);

    if (endDateTime <= startDateTime) {
      setWarningMessage(
        "Tanggal keluar tidak boleh lebih kecil atau sama dengan tanggal masuk."
      );
      return;
    }

    const bookingData = {
      brand,
      type,
      vehicleSize,
      entryDate,
      entryTime,
      exitDate,
      exitTime,
      locationName: loc?.name,
      totalPrice: calculatePrice(),
    };

    navigate("/biodata", { state: bookingData });
  };

  useEffect(() => {
    const validateVehicleSize = () => {
      if (vehicleSize && !loc?.vehicleSizes?.includes(vehicleSize)) {
        setInvalidVehicleSize(true);
        setWarningMessage(
          "Kendaraan tidak sesuai dengan jenis kendaraan yang diperbolehkan."
        );
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-8">
        <div className="flex-1 p-6 bg-white rounded-lg shadow-lg border">
          <h2 className="text-xl font-semibold text-center">{loc?.name}</h2>
          <ParkingMap location={loc} />

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Harga Per Hari:</h3>
            {loc?.pricePerDay?.small !== 0 && (
              <p className="text-gray-600 mt-2">
                <strong>Kendaraan Kecil:</strong> Rp{" "}
                {loc?.pricePerDay?.small?.toLocaleString() || "0"}
              </p>
            )}
            {loc?.pricePerDay?.medium !== 0 && (
              <p className="text-gray-600 mt-2">
                <strong>Kendaraan Sedang:</strong> Rp{" "}
                {loc?.pricePerDay?.medium?.toLocaleString() || "0"}
              </p>
            )}
            {loc?.pricePerDay?.large !== 0 && (
              <p className="text-gray-600 mt-2">
                <strong>Kendaraan Besar:</strong> Rp{" "}
                {loc?.pricePerDay?.large?.toLocaleString() || "0"}
              </p>
            )}
          </div>

          <p className="text-gray-600 mt-2">
            <strong>Jumlah Kendaraan yang Sudah Parkir:</strong>{" "}
            {loc?.parkedVehicles?.small +
              loc?.parkedVehicles?.medium +
              loc?.parkedVehicles?.large}{" "}
            / {loc?.capacity}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Status:</strong> {isParkingFull ? "Penuh" : "Tersedia"}
          </p>

          <h3 className="mt-4 text-xl font-semibold">
            Jenis Kendaraan yang Diperbolehkan:
          </h3>
          <ul className="list-disc ml-5 text-gray-600">
            {loc?.vehicleSizes?.includes("small") && <li>Kecil</li>}
            {loc?.vehicleSizes?.includes("medium") && <li>Sedang</li>}
            {loc?.vehicleSizes?.includes("large") && <li>Besar</li>}
          </ul>
        </div>

        <div className="w-96 p-6 bg-white rounded-lg shadow-lg border">
          <h3 className="text-2xl font-semibold mb-4">Form Pemesanan</h3>

          <form onSubmit={handleSubmit}>
            <VehicleInput
              brandList={brandList}
              brand={brand}
              setBrand={setBrand}
              type={type}
              setType={setType}
              vehicleSize={vehicleSize}
              setVehicleSize={setVehicleSize}
              getTypesByBrand={getTypesByBrand}
              getSizeByType={getSizeByType}
            />
            <DateTimePicker
              label="Tanggal Masuk"
              selectedDate={entryDate}
              onChange={setEntryDate}
              type="date"
            />
            <DateTimePicker
              label="Waktu Masuk"
              selectedDate={entryTime}
              onChange={setEntryTime}
              type="time"
            />
            <DateTimePicker
              label="Tanggal Keluar"
              selectedDate={exitDate}
              onChange={setExitDate}
              type="date"
            />
            <DateTimePicker
              label="Waktu Keluar"
              selectedDate={exitTime}
              onChange={setExitTime}
              type="time"
            />

            {warningMessage && vehicleSize && (
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
                className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ${
                  invalidVehicleSize || isParkingFull
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={invalidVehicleSize || isParkingFull}
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
  );
};

export default BookingPage;
