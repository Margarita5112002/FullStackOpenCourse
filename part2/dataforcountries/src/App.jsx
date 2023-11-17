import { useEffect } from "react";
import { useState } from "react";
import countriesRepo from "./services/countriesRepo";
import "./index.css";

const CountryResult = ({ country, handleShowCountry }) => {
  return (
    <div>
      {country.name.common}
      <button onClick={() => handleShowCountry(country)}>Show</button>
    </div>
  );
};

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>{`capital ${country.capital[0]}`}</p>
      <p>{`area ${country.area}`}</p>
      <b>{"languages: "}</b>
      <ul>
        {Object.entries(country.languages).map((entry) => {
          return <li key={entry[0]}>{entry[1]}</li>;
        })}
      </ul>
      <img src={country.flags.png} />
    </div>
  );
};

const SearchResults = ({ foundCountries, showCountry, handleShowCountry }) => {
  if (showCountry != null) {
    return <Country country={showCountry} />;
  } else if (foundCountries.length == 0) {
    return <div>No countries found</div>;
  } else if (foundCountries.length == 1) {
    return <Country country={foundCountries[0]} />;
  } else if (foundCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  return (
    <>
      {foundCountries.map((country) => {
        return (
          <CountryResult
            key={country.name.official}
            country={country}
            handleShowCountry={handleShowCountry}
          />
        );
      })}
    </>
  );
};

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [showCountry, setShowCountry] = useState(null);

  useEffect(() => {
    countriesRepo
      .getAllCountries()
      .then((response) => {
        console.log("Countries Fetch !");
        console.log(response);
        setCountries(response);
      })
      .catch((error) => {
        console.log("Error fetching countries ... ");
        console.log(error);
      });
  }, []);

  const filterCountriesByQuery = () =>
    countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );

  const handleQueryChange = (event) => {
    setShowCountry(null);
    setQuery(event.target.value);
  };

  const handleShowCountry = (country) => {
    setShowCountry(country);
  };

  return (
    <>
      <div>
        find countries{" "}
        <input type="text" value={query} onChange={handleQueryChange} />
      </div>
      <SearchResults
        foundCountries={filterCountriesByQuery()}
        showCountry={showCountry}
        handleShowCountry={handleShowCountry}
      />
    </>
  );
};

export default App;
