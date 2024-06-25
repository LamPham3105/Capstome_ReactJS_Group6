import React, { useState, useEffect } from "react";
import SearchResult from "./SearchResult";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "../../service/product/productApi";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [filteredResults, setFilteredResults] = useState([]);

  const { isLoading, isPending, data, error } = useQuery({
    queryKey: ["productListApi"],
    queryFn: productApi.getProducts,
    staleTime: 5 * 60 * 1000,
    cacheTime: 12 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const handleSearch = () => {
    getData();
  };

  const getData = () => {
    if (!isLoading && data) {
      let filteredData = data;

      // Filter by searchQuery if it's not empty
      if (searchQuery.trim() !== "") {
        filteredData = data.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sort filteredData based on sortBy
      if (sortBy === "price") {
        filteredData.sort((a, b) => a.price - b.price);
      } else if (sortBy === "name") {
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
      }

      setFilteredResults(filteredData);
    }
  };

  useEffect(() => {
    getData();
  }, [data, sortBy, isLoading]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter search query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 mb-3">
          <label htmlFor="sortSelect" className="form-label">
            Sort by:
          </label>
          <select
            id="sortSelect"
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price">Price</option>
            <option value="name">Name</option>
            {/* Add more sorting options as needed */}
          </select>
        </div>
      </div>

      <SearchResult
        searchResults={filteredResults}
        isLoading={isLoading}
        isPending={isPending}
        error={error}
      />
    </div>
  );
};

export default Search;
