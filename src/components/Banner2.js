import React from "react";
import Icon from "../icons/icon1.png";
import Icon2 from "../icons/icon2.png";
import Icon3 from "../icons/icon3.png";

const Banner2 = () => {
  return (
    <div className="relative py-12 px-6 ">
      <div className="absolute inset-0 rounded-2xl w-[65%] h-[100%] bg-gray1 z-[-1] top-[5%] left-[50%] transform -translate-x-1/2"></div>

      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-small text-blue1 mt-4 mb-4 font-poppins">
          Layanan Pak Olin
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <img src={Icon} alt="Icon" className="w-16 h-16 mx-auto mb-2" />
            <h3 className="text-md font-semibold text-blue1 mb-2">
              Mitra Resmi Kami
            </h3>
            <p className="text-gray-700 text-sm">
              Kami bekerja sama dengan banyak mitra resmi di seluruh kota,
              memastikan parkir Anda aman dan terpercaya.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <img src={Icon2} alt="Icon" className="w-16 h-16 mx-auto mb-2" />
            <h3 className="text-md font-semibold text-blue1 mb-2">
              Banyak Pilihan
            </h3>
            <p className="text-gray-700 text-sm">
              Kami memiliki banyak lokasi parkir yang dapat Anda pilih sesuai
              dengan kebutuhan dan preferensi Anda.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg py-8 px-8 text-center ">
            <img src={Icon3} alt="Icon" className="w-14 mx-auto mb-2" />
            <h3 className="text-md font-semibold text-blue1 mb-2">
              Pesan Sekarang
            </h3>
            <p className="text-gray-700 text-sm">
              Jangan tunggu lagi! Pesan tempat parkir Anda sekarang juga dan
              nikmati berbagai keuntungan dan diskon menarik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner2;
