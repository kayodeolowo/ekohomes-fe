"use client";
import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import { Container } from "../layouts/Container";
import ViewProperty from "../modals/ViewProperty";
import { useFetchPropertiesQuery } from "../../redux/services/propertiesService";
import Loader from "../layouts/Loader";
import { toast } from 'react-hot-toast';

const Properties = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  // Debounced search is dependent on searchQuery
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer); // Clean up the timeout on component unmount
  }, [searchQuery]);

  // Fetch properties based on search query and pagination
  const { data, error, isLoading } = useFetchPropertiesQuery({ page: currentPage, search: debouncedSearch });

  // Show toast if no properties are found
  useEffect(() => {
    if (data && data.data.properties && data.data.properties.length === 0) {
      toast.error("No properties found!");
    }
  }, [data]); // This should be called unconditionally

  // Handle loading state
  if (isLoading) {
    return <div className="mt-20"><Loader /></div>;
  }

  // Handle error state
  if (error) {
    return <div>Error fetching properties: {error.message}</div>;
  }

  // Handle property click to view more details
  const handlePropertyClick = (id) => {
    setSelectedPropertyId(id);
    setOpenModal(true);
  };

  // Handle pagination
  const goToNextPage = () => {
    if (data && data.data.totalPages > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Container>
      {/* Search bar */}
      <div className="flex items-center justify-center mt-5 mb-8">
        <div className="bg-dark flex p-2 border-secondaryblack border w-[20rem] items-center rounded-lg">
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search property"
            className="bg-inherit text-gray-300 focus:outline-none w-[95%]"
          />
        </div>
      </div>

      {/* Display properties */}
      <div className="grid grid-cols-1 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data && data?.data?.properties && data?.data?.properties?.length > 0 ? (
          data.data.properties.map((property) => (
            <div key={property._id} onClick={() => handlePropertyClick(property._id)}>
              <PropertyCard property={property} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center h-64">
            <p className="text-white mt-20 text-center">Sorry  property Not Found</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="w-fit mx-auto mb-4 mt-5">
        <div className="flex justify-between items-center space-x-2 mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className=" max-md:text-sm px-2 md:px-4 py-2 bg-gray-300 rounded-md"
          >
            Previous
          </button>

          <div className="text-center">
            <p className="text-gray-500 max-md:text-sm">
              Total Items: {data ? data?.data?.totalItems : 0} | Page {currentPage} of {data ? data?.data?.totalPages : 0}
            </p>
          </div>

          <button
            onClick={goToNextPage}
            disabled={data && data?.data?.totalPages === currentPage}
            className="max-md:text-sm px-2 md:px-4 py-2 bg-gray-300 rounded-md"
          >
            Next
          </button>
        </div>
      </div>

      {/* Property Modal */}
      <ViewProperty
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
        id={selectedPropertyId}
      />
    </Container>
  );
};

export default Properties;
