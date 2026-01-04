// redux/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { setAuth, logout } from '../auth/authSlice';
import { RootState } from '../../store';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.tokens.access_token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // If we get a 401 error, try to refresh the token
    if (result.error && result.error.status === 401) {
        const state = api.getState() as RootState;
        const refreshToken = state.auth.tokens.refresh_token;

        if (refreshToken) {
            // Try to get a new access token
            const refreshResult = await baseQuery(
                {
                    url: '/token/refresh/',
                    method: 'POST',
                    body: { refresh: refreshToken },
                },
                api,
                extraOptions
            );

            if (refreshResult.data) {
                // Store the new tokens
                const newTokens = refreshResult.data as {
                    access: string;
                    refresh?: string;
                };

                api.dispatch(
                    setAuth({
                        user: state.auth.user,
                        tokens: {
                            access_token: newTokens.access,
                            refresh_token: newTokens.refresh || refreshToken,
                        },
                    })
                );

                // Retry the original query with the new token
                result = await baseQuery(args, api, extraOptions);
            } else {
                // Refresh failed, logout the user
                api.dispatch(logout());
            }
        } else {
            // No refresh token available, logout
            api.dispatch(logout());
        }
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Profile'],
    endpoints: () => ({}),
});