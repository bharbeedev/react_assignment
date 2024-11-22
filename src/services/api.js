import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1";

export const fetchAllCountries = async () => {
  const response = await axios.get(`${BASE_URL}/all`);
  return response.data;
};

export const fetchCountryDetails = async (countryName) => {
  const response = await axios.get(`${BASE_URL}/name/${countryName}`);
  return response.data;
};
