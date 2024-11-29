import React from "react";

const BookingSummary = ({ brand, type, vehicleSize, entryDate, entryTime, exitDate, exitTime, totalPrice, locationName }) => {
  const formattedEntryDate = new Date(entryDate).toLocaleDateString("id-ID", { day: '2-digit', month: 'long', year: 'numeric' });
  const formattedExitDate = new Date(exitDate).toLocaleDateString("id-ID", { day: '2-digit', month: 'long', year: 'numeric' });

  const entry = new Date(entryDate);
  const exit = new Date(exitDate);
  const duration = Math.ceil((exit - entry) / (1000 * 60 * 60 * 24));

  return (
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
            <strong>Ukuran Kendaraan:</strong> {vehicleSize === "small" ? "Kecil" : vehicleSize === "medium" ? "Sedang" : "Besar"}
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
          <p className="text-gray-600">
            <strong>Lama Parkir:</strong> {duration} Hari
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
  );
};

export default BookingSummary;