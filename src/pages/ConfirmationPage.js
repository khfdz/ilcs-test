import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css';

const ConfirmationPage = () => {
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
    name,
    phone,
    email,
    plateNumber,
  } = location.state || {};

  const formattedEntryDate = new Date(entryDate).toLocaleDateString("id-ID", { day: '2-digit', month: 'long', year: 'numeric' });
  const formattedExitDate = new Date(exitDate).toLocaleDateString("id-ID", { day: '2-digit', month: 'long', year: 'numeric' });

  const entry = new Date(entryDate);
  const exit = new Date(exitDate);
  const duration = Math.ceil((exit - entry) / (1000 * 60 * 60 * 24));

  const handleConfirm = () => {
    Swal.fire({
      title: 'Pemesanan Berhasil!',
      text: 'Terima kasih sudah melakukan pemesanan.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate("/", {
        state: {
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
          plateNumber,
        },
      });
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-8">
        <div className="flex-1 p-6 bg-white rounded-lg shadow-lg border">
          <h3 className="text-2xl font-semibold mb-4">Konfirmasi Pemesanan</h3>

          <div className="mb-4">
            <h4 className="text-lg font-semibold">Informasi Pengguna</h4>
            <p className="text-gray-600 mt-2">
              <strong>Nama Lengkap:</strong> {name}
            </p>
            <p className="text-gray-600">
              <strong>Nomor HP:</strong> {phone}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {email}
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold">Informasi Kendaraan</h4>
            <p className="text-gray-600 mt-2">
              <strong>Merk:</strong> {brand}
            </p>
            <p className="text-gray-600">
              <strong>Jenis:</strong> {type}
            <p className="text-gray-600">
              <strong>No. Plat:</strong> {plateNumber}
            </p>
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

          <div className="mt-4 flex gap-4">
            <button
              className="w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              onClick={() => navigate("/")}
            >
              Batalkan Pemesanan
            </button>
            <button
              className="w-full bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded"
              onClick={handleConfirm}
            >
              Konfirmasi Pemesanan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
