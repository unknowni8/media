import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { pause } from "../../utilities/common_utils";

export const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005/',
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        removeAlbum: builder.mutation({
            invalidatesTags: (result, error, album) => {
                return [{ type: "Album", id: album.id }];
            },
            query: (album) => {
                return {
                    url: `/albums/${album.id}`,
                    method: "DELETE"
                };
            },
        }),
        addAlbum: builder.mutation({
            invalidatesTags: (result, error, user) => {
                return [{ type: "UserAlbum", id: user.id }];
            },
            query: (user) => {
                return {
                    url: "/albums",
                    body: {
                        userId: user.id,
                        title: faker.commerce.productName(),
                    },
                    method: "POST",
                };
            }
        }),
        fetchAlbums: builder.query({
            providesTags: (result, error, user) => {
                const tags = result.map((album) => {
                    return { type: "Album", id: album.id };
                });
                tags.push({ type: "UserAlbum", id: user.id });
                return tags;
            },
            query: (user) => {
                return {
                    url: '/albums',
                    params: { userId: user.id },
                    method: 'GET',
                }
            }
        }),
    }),
});

export const {
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation,
 } = albumsApi;