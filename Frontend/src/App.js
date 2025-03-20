import React, { useState, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { autoSuggestQuery } from "./utils/queryHelper";
import "./App.css";

const App = () => {
  const [queryInput, setQueryInput] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async () => {
    if (!queryInput.trim()) {
      setError("Please enter a query before searching.");
      return;
    }

    setHasSearched(true);
    setLoading(true);
    setError(null);

    const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${queryInput}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&cx=${process.env.REACT_APP_SEARCH_ENGINE_ID}`;

    console.log("Fetching results from:", apiUrl); // Debugging

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setResults(data.items || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
      setError(error.message || "Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [queryInput]);

  return (
    <div className="app-container">
      <h1 className="title">🔍 Google Dorking Query Builder</h1>

      <SearchBar
        queryInput={queryInput}
        setQueryInput={setQueryInput}
        handleSearch={handleSearch}
        autoSuggestQuery={autoSuggestQuery}
      />

      {loading && <p className="text-blue-400 text-center mt-4 animate-pulse">⏳ Searching...</p>}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <SearchResults results={results} hasSearched={hasSearched} />
    </div>
  );
};

export default App;
