import { makeRequest } from "./makeRequest"

export const Api = {
    get: (url: string, params?: any, headers?: any) =>
        makeRequest({
            url,
            method: "GET",
            bodyparam: params,
            headers
        }),
    post: (url: string, params?: any, headers?: any) =>
        makeRequest({
            url,
            method: "POST",
            bodyparam: params,
            headers
        })
    ,
    delete: (url: string, params?: any, headers?: any) =>
        makeRequest({
            url,        
            method: "DELETE",
            bodyparam: params,
            headers
        })  


}