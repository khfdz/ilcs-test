import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Page1 from "./pages/Page1";
import BookingPage from "./pages/BookingPage";
import BiodataPage from "./pages/BiodataPage";
import ConfirmationPage from "./pages/ConfirmationPage";


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page1 />} />
        
        <Route path="/booking/:id" element={<BookingPage />} />

        <Route path="/biodata" element={<BiodataPage />} />

        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
};

export default App;


