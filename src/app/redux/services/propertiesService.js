import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const propertiesService = createApi({
  reducerPath: 'propertiesService',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://ekohomes.onrender.com/api/v1/' }),
  endpoints: (builder) => ({
    fetchProperties: builder.query({
      query: ({ page = 1, search = '' }) => {
        return `properties?page=${page}&search=${search}`; // Include search query parameter
      },
      keepUnusedDataFor: 5000, // Keep cached data for 5000 ms (5 seconds)
    }),
    


    fetchPropertiesId: builder.query({
      query: (id) => `properties/${id}`,
      keepUnusedDataFor: 5000, // Keep cached data for 300 seconds (5 minutes)
    }),
  }),
});

// Export the auto-generated hooks for the queries
export const {  useFetchPropertiesIdQuery, useFetchPropertiesQuery } = propertiesService;