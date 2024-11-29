import React, { useRef } from "react";
import OpenStreetMapWithLocations from "../components/OpenStreetMapWithPoints";
import Navbar from "../components/Navbar";
import Banner1 from "../components/Banner1";
import Banner2 from "../components/Banner2";
import Footer from "../components/Footer";

const Page1 = () => {
  const mapRef = useRef(null);

  const scrollToMap = () => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <Banner1 onSearchClick={scrollToMap} />
      <div ref={mapRef}>
        <OpenStreetMapWithLocations />
      </div>
      <Banner2 />
      <Footer />
    </div>
  );
};

export default Page1;
