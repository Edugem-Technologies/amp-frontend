import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query"
import { Any, AnyObject } from "../common/helper"
import { FetchHelper } from "@/services/fetch-helper"

/**
 * Type definition for the parameters accepted by the `useFetchData` hook.
 *
 * @interface UseFetchDataType
 * @property {URL} url - The URL endpoint to fetch the data from.
 * @property {AnyObject} [params] - Optional query parameters for the request.
 * @property {UseQueryOptions} tanstackQueryOption - TanStack Query options to further customize the `useQuery` behavior.
 */
export interface UseFetchDataType {
    /** The URL endpoint to fetch data from */
    url: URL
    /** Optional query parameters to be passed in the request */
    params?: AnyObject
    /** TanStack Query's options for customizing the `useQuery` behavior */
    tanstackQueryOption: UseQueryOptions<Any, Error, Any, Any[]>
}

/**
 * Type definition for the parameters accepted by the `useMutateData` hook.
 *
 * @interface UseMutateDataType
 * @property {URL} url - The URL endpoint where the mutation will take place.
 * @property {UseMutationOptions} [tanstackMutateOptions] - Optional mutation options to customize the mutation behavior.
 * @property {string} method - The HTTP method for the mutation (e.g., "post", "put", "delete").
 * @property {Array} [queryKeys] - The query keys for which cache should be invalidated after mutation.
 */
export interface UseMutateDataType {
    /** The URL endpoint for the mutation */
    url: URL
    /** Optional mutation options to configure TanStack Query's `useMutation` */
    tanstackMutateOptions?: UseMutationOptions<
        Any,
        Error,
        { data?: AnyObject; params?: AnyObject; contentType?: string },
        unknown
    >
    /** The HTTP method for the mutation (e.g., "post", "put", "delete") */
    method: keyof Omit<typeof FetchHelper, "get">
    /** Query keys for cache invalidation after mutation */
    queryKeys?: Any[]
}

/**
 * Type definition for the function argument that contains the mutation data and parameters.
 *
 * @interface MutationFunctionType
 * @property {AnyObject} [data] - The data to be sent in the mutation request.
 * @property {AnyObject} [params] - Optional query parameters for the mutation.
 * @property {string} [contentType] - The content type for file data mutations (e.g., "multipart/form-data").
 */
export interface MutationFunctionType {
    /** The data to be sent in the mutation request */
    data?: AnyObject
    /** Optional query parameters for the mutation */
    params?: AnyObject
    /** Content type for file data mutations */
    contentType?: string
}
