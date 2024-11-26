import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BiodataPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    brand,
    type,
    vehicleSize,
    entryDate,
    entryTime,
    exitDate,
    exitTime,
    totalPrice,
    locationName,
  } = location.state || {};

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert("Anda harus menyetujui syarat dan ketentuan!");
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
      totalPrice,
      locationName,
      name,
      phone,
      email,
    };

    navigate("/confirmation", { state: bookingData });
  };

  const formattedEntryDate = new Date(entryDate).toLocaleDateString();
  const formattedExitDate = new Date(exitDate).toLocaleDateString();

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-8">
        <div className="flex-1 p-6 bg-white rounded-lg shadow-lg border">
          <h3 className="text-2xl font-semibold mb-4">Form Biodata</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 p-2 w-full border rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700">
                Nomor HP
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 p-2 w-full border rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 p-2 w-full border rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2"
                required
              />
              <label htmlFor="terms" className="text-gray-700">
                Saya setuju dengan Syarat dan Ketentuan
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Lanjutkan Pemesanan
              </button>
              <button
                type="button"
                className="w-full bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
                onClick={() => navigate("/")}
              >
                Kembali
              </button>
            </div>
          </form>
        </div>

        <div className="w-96 p-6 bg-white rounded-lg shadow-lg border">
          <h3 className="text-2xl font-semibold mb-4">Ringkasan Pemesanan</h3>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <div className="mb-4">
              <h4 className="text-lg font-semibold">Informasi Kendaraan</h4>
              <p className="text-gray-600 mt-2">
                <strong>Merk:</strong> {brand}
              </p>
              <p className="text-gray-600">
                <strong>Jenis:</strong> {type}
              </p>
              <p className="text-gray-600">
                <strong>Ukuran Kendaraan:</strong>{" "}
                {vehicleSize === "small"
                  ? "Kecil"
                  : vehicleSize === "medium"
                  ? "Sedang"
                  : "Besar"}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold">Tanggal Parkir</h4>
              <p className="text-gray-600 mt-2">
                <strong>Tanggal Masuk:</strong> {formattedEntryDate} {entryTime}
              </p>
              <p className="text-gray-600">
                <strong>Tanggal Keluar:</strong> {formattedExitDate} {exitTime}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold">Lokasi Parkir</h4>
              <p className="text-gray-600">
                <strong>Lokasi:</strong> {locationName}
              </p>
              <p className="text-gray-600">
                <strong>Total Harga:</strong> Rp {totalPrice?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodataPage;
