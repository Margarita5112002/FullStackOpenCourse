import axios from "axios";

const urlBase = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = () =>
  axios.get(`${urlBase}/all`).then((response) => response.data);

export default { getAllCountries };
