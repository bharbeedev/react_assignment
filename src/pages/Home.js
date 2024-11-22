import React, { useEffect, useState } from "react";
import { fetchAllCountries } from "../services/api";
import CountryCard from "../components/CountryCard";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;
  const [sortOrder, setSortOrder] = useState("asc"); // Default: ascending

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchAllCountries();
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    getCountries();
  }, []);

  // Search functionality
  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, countries]);

  // Pagination
  const lastIndex = currentPage * countriesPerPage;
  const firstIndex = lastIndex - countriesPerPage;
  const currentCountries = filteredCountries.slice(firstIndex, lastIndex);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredCountries.length / countriesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const sortCountriesByPopulation = () => {
    const sorted = [...filteredCountries].sort((a, b) => {
      return sortOrder === "asc"
        ? a.population - b.population
        : b.population - a.population;
    });
    setFilteredCountries(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search countries..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <button
            className="btn btn-primary me-2"
            onClick={sortCountriesByPopulation}
          >
            Sort by Population (
            {sortOrder === "asc" ? "Lowest to Highest" : "Highest to Lowest"})
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setIsGridView(!isGridView)}
          >
            Toggle {isGridView ? "List" : "Grid"} View
          </button>
        </div>
      </div>

      <div className={isGridView ? "row g-4" : ""}>
        {currentCountries.map((country) => (
          <div
            key={country.cca3}
            className={isGridView ? "col-md-3 col-sm-12" : ""}
          >
            <CountryCard country={country} />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-primary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of{" "}
          {Math.ceil(filteredCountries.length / countriesPerPage)}
        </span>
        <button
          className="btn btn-primary"
          onClick={handleNextPage}
          disabled={
            currentPage ===
            Math.ceil(filteredCountries.length / countriesPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
