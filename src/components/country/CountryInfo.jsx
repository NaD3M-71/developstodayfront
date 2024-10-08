import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';  // Importar el gráfico de línea
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
  const { countryCode } = useParams();  // Obtener el código del país desde la URL
  const [countryData, setCountryData] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [populationData, setPopulationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        // Obtener la información básica del país
        const countryInfoResponse = await axios.get(`http://localhost:5000/country-info/${countryCode}`);
        setCountryData(countryInfoResponse.data);

        console.log(countryInfoResponse);
        // Obtener los países limítrofes
        setBorderCountries(countryInfoResponse.data.borders);

        // Obtener los datos de población
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
      {/* Mostrar el nombre y la bandera del país */}
      <h1>{populationData.country}</h1>
      <img className='w-25' src={countryData.flagUrl} alt={`Flag of ${populationData.country}`} />

      {/* Lista de países limítrofes */}
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

      {/* Gráfico de población */}
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
