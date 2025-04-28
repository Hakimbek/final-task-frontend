import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../slice/authSlice.ts";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://final-task-backend-ookm.onrender.com",
    prepareHeaders: (headers) => {
        headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
        headers.set("Content-Type", "application/json");

        return headers;
    }
});

const baseQueryWithAuthHandling: BaseQueryFn = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        api.dispatch(logout());
        window.location.href = "/login";
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'apiSlice',
    baseQuery: baseQueryWithAuthHandling,
    tagTypes: ["Template", "User"],
    endpoints: () => ({})
})
