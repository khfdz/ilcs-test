import OpenStreetMapWithLocations from "../components/OpenStreetMapWithPoints";

const Page1 = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Sistem Parkir</h1>
      <OpenStreetMapWithLocations />
    </div>
  );
};

export default Page1;
