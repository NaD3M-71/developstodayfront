import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2'; // for graph
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const CountryInfo = () => {
  const { countryCode } = useParams();  // Obtaining the country code from URL
  const [countryData, setCountryData] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [populationData, setPopulationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        // basic information from country
        const countryInfoResponse = await axios.get(`http://localhost:5000/country-info/${countryCode}`);
        setCountryData(countryInfoResponse.data);

        console.log(countryInfoResponse);
        // saving border countries
        setBorderCountries(countryInfoResponse.data.borders);

        // saving population data
        setPopulationData(countryInfoResponse.data.populationData)



        setLoading(false);
      } catch (error) {
        setError('Error fetching country information');
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [countryCode]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='p-5 d-flex flex-column justify-content-between align-items-center'>
      {/* Show name and flag */}
      <h1>{populationData.country}</h1>
      <img className='w-25' src={countryData.flagUrl} alt={`Flag of ${populationData.country}`} />

      {/* border countries list */}
      <div>
        <h2>Border Countries</h2>
        <ul>
          {borderCountries.map((borderCountry) => (
            <li className='btn btn-dark m-1 text-decoration-none' key={borderCountry.code}>
              <Link to={`/country-info/${borderCountry.countryCode}`}>{borderCountry.commonName}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* population graph */}
      <div className='d-flex flex-column align-items-center'>
        <h2>Population Over Time</h2>
        <Line
            className='w-100 bg-light'
          data={{
            labels: populationData.populationCounts.map((data) => data.year), // Eje X - Años
            datasets: [
              {
                label: 'Population',
                data: populationData.populationCounts.map((data) => data.value), // Eje Y - Población
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default CountryInfo;
