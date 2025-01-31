"use client"
import { FetchHelper } from "@/services/fetch-helper"
import { AnyObject } from "@/types/common/helper"
import {
    MutationFunctionType,
    UseFetchDataType,
    UseMutateDataType,
} from "@/types/hooks/useFetchHelper"
import { handleError } from "@/utils/handle-error"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

/**
 * Custom hook to fetch data using TanStack Query's `useQuery` hook.
 * This hook provides caching and error handling.
 * In case of an error, it invokes the `handleError` function to handle it appropriately.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {URL} params.url - The URL endpoint to fetch the data from.
 * @param {AnyObject} [params.params] - Optional query parameters to be passed in the API request.
 * @param {UseQueryOptions} params.tanstackQueryOption - Additional options for TanStack Query's `useQuery` hook.
 *
 * @returns {UseQueryResult<Any, Error>} - The result of the `useQuery` hook, including the fetched data, loading status, and error handling.
 *
 * @example
 * const { data, isLoading, error } = useFetchData({
 *   url: '/api/user',
 *   params: { userId: 1 },
 *   tanstackQueryOption: { enabled: true }
 * });
 */
export const useFetchData = ({ url, params, tanstackQueryOption }: UseFetchDataType) => {
    return useQuery({
        queryFn: async () => {
            try {
                return await FetchHelper.get(url, params)
            } catch (error) {
                handleError(error)
            }
        },
        staleTime: 5 * 1000 * 60, //stale time is 5 minutes
        refetchOnMount: true,
        ...tanstackQueryOption,
    })
}

/**
 * Custom hook to perform mutations using TanStack Query's `useMutation` hook.
 * This hook abstracts the mutation process for various HTTP methods (POST, PUT, DELETE, etc.)
 * and automatically invalidates any relevant queries on success.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {URL} params.url - The URL endpoint to perform the mutation on.
 * @param {UseMutationOptions} [params.tanstackMutateOptions] - Optional configuration for TanStack Query's `useMutation`.
 * @param {string} params.method - The HTTP method to be used (e.g., "post", "put", "delete").
 * @param {Array} [params.queryKeys] - Array of query keys for which the cache should be invalidated on success.
 *
 * @returns {MutationResult} - The result of the `useMutation` hook, including the mutation status and any associated data.
 *
 * @example
 * const { mutate } = useMutateData({
 *   url: '/api/user',
 *   method: 'post',
 *   queryKeys: ['users'],
 *   tanstackMutateOptions: { onError: (error) => { console.log(error) } },
 * });
 */
export const useMutateData = ({
    url,
    tanstackMutateOptions,
    method,
    queryKeys,
}: UseMutateDataType) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ data, params, contentType }: MutationFunctionType) => {
            switch (method) {
                case "delete":
                    return await FetchHelper.delete(url, params)
                case "putFileData":
                    return await FetchHelper.putFileData(url, data, contentType as string)
                default:
                    return await FetchHelper[method](url, data as AnyObject, params)
            }
        },
        onSuccess() {
            if (queryKeys?.length) {
                queryClient.invalidateQueries({
                    queryKey: [...queryKeys],
                })
            }
        },
        ...tanstackMutateOptions,
    })
}
