"use client";
import React, { useState } from "react";
import { Container } from "./Container";
import { PrimaryButton } from "./PrimaryButton";
import { IoMdSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useFetchPropertiesQuery } from "../../redux/services/propertiesService";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1); // To track current page
  const { data, error, isLoading } = useFetchPropertiesQuery({ page, search: searchQuery });

  // Handle change in search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    // Trigger search using the current searchQuery
    setPage(1); // Reset to page 1 when performing a new search
  };

  return (
    <Container>
      <div className="flex items-center justify-between mt-10">
        <div className="bg-dark flex p-2 border-secondaryblack border w-[20rem] items-center rounded-lg">
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search property"
            className="bg-inherit w-[95%]"
          />
          <IoMdSearch
            className="text-white text-2xl text-gray-400 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
        <PrimaryButton>Add Property</PrimaryButton>
      </div>

      {/* Display search results */}
      {isLoading && <div>Loading...</div>}
      {error && <div>Error fetching properties: {error.message}</div>}

      {/* Optionally display search results */}
      {data && data.data.properties && (
        <div className="mt-4">
          {data.data.properties.map((property) => (
            <div key={property._id}>
              <h3>{property.property_name}</h3>
              <p>{property.address}</p>
              <p>{property.price}</p>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Header;
