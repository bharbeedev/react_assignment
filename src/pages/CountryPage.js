import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCountryDetails } from "../services/api";

const CountryPage = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCountryDetails = async () => {
      try {
        const data = await fetchCountryDetails(name);
        setCountry(data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching country details:", error);
      }
    };

    getCountryDetails();
  }, [name]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "800px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={country.flags.png}
              className="img-fluid rounded-start"
              alt={`${country.name.common} flag`}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{country.name.common}</h5>
              <p className="card-text">
                <strong>Capital:</strong> {country.capital?.[0]}
              </p>
              <p className="card-text">
                <strong>Region:</strong> {country.region}
              </p>
              <p className="card-text">
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
              <p className="card-text">
                <strong>Languages:</strong>{" "}
                {Object.values(country.languages).join(", ")}
              </p>
              <p className="card-text">
                <strong>Timezones:</strong> {country.timezones.join(", ")}
              </p>
              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
