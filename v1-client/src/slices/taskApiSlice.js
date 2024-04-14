import { apiSlice } from "./apiSlice.js";

const TASKS_URL = "/api/tasks";

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/new`,
        method: "POST",
        body: data,
      }),
    }),
    // Define a query endpoint for fetching tasks
    fetchTasks: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/mytasks`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const { useCreateMutation, useFetchTasksMutation } = tasksApiSlice;
