import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BiodataForm = ({ brand, type, vehicleSize, entryDate, entryTime, exitDate, exitTime, totalPrice, locationName }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
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
      plateNumber
    };

    navigate("/confirmation", { state: bookingData });
  };

  return (
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
            <label htmlFor="name" className="block text-gray-700">
                Plat Nomor Kendaraan
                </label>
                <input
                    type="text"
                    id="name"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
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
            type="button"
            className="w-full bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
            onClick={() => navigate("/")}
          >
            Kembali
          </button>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded"
          >
            Lanjutkan Pemesanan
          </button>
        </div>
      </form>
    </div>
  );
};

export default BiodataForm;