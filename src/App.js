import React, { Fragment } from "react";

// Routing
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* Layout */
import Header from "./components/layout/Header";
import CountryList from "./components/country/CountryList";
import CountryInfo from "./components/country/CountryInfo";

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route exact path="/" element={<CountryList/>} />
          <Route path="/country-info/:countryCode" element={<CountryInfo/>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
