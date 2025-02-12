import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'UsersApi',
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({baseUrl: `https://rickandmortyapi.com/api/character/?name=${charQuery}&page=${currentPage}`}),
    // 
    endpoints: (build) => ({
        getUsers: build.query({
            query: (limit = '') => `users?${limit && `&page=${limit}`}`,
        }),
        getUser: build.query({
            query: (id) => `users/${id}`,
        }),
    })
});

export const {useGetUsersQuery, useGetUserQuery,  useAddUserMutation, useDeleteUserMutation} = usersApi;