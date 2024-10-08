import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import clientAxios from '../../config/axios';
import { Link } from 'react-router-dom';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await clientAxios.get('/');
        setCountries(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching countries');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <p>Loading countries...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='bg-success p-2 d-flex flex-column align-items-center'>
      <h1>Country List</h1>
      <ul>
        {countries.map((country) => (
          <li className='btn btn-light m-1 text-decoration-none' key={country.countryCode}>
            <Link to={`/country-info/${country.countryCode}`}>
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
