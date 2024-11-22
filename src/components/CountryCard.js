import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  return (
    <div className="card h-100">
      <img
        src={country.flags.png}
        className="card-img-top"
        alt={`${country.name.common} flag`}
      />
      <div className="card-body">
        <h5 className="card-title">{country.name.common}</h5>
        <p className="card-text">
          <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
        </p>
        <p className="card-text">
          <strong>Region:</strong> {country.region}
        </p>
        <p className="card-text">
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <Link
          to={`/country/${country.name.common}`}
          className="btn btn-secondary"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CountryCard;
