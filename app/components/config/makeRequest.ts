import service from "./ApiConfig";

const buildRequest = (request: any) => {
    console.log(request);
    const { body, method, url, headers, bodyparam, responseType } = request;
    const contentType = bodyparam instanceof FormData
        ? 'multipart/form-data'
        : 'application/json';
    let headersObj: any = {
        'Content-Type': contentType,
    };
    var requestConfig: any = {
        // body: contentType,
        headers: headersObj,
        method,
        url
    };

    console.log(requestConfig);

    if (responseType) {
        requestConfig["responseType"] = responseType;
    }


    if (bodyparam) {
        requestConfig["data"] = bodyparam
    }

    return requestConfig;
};
export const makeRequest = async (request: any) => {

    const requestConfig = buildRequest(request);
    try {
        const response = await service(requestConfig);
        console.log(response+"responseesssss");
        
        return response.data;
    } catch (error: any) {
        throw await formatError(error);
    }
    // return new Promise((resolve, reject) => {
    //     const axiosRequest = axios(requestConfig);
    //     axiosRequest
    //         .then((values) => {

    //             resolve(values);
    //         })
    //         .catch(async (error:any) => {
    //             reject(formatError(error));

    //         });


    // });
};

export const defaultResponse = {
    status: 500,
    data: {
        error: 'Server error',
    },
};

export const formatError = async (responseError: any) => {
    var blobError = "Server Error";
    try {
        var blobErrorData = JSON.parse(await responseError.response.data.text()).message;
        if (blobErrorData && blobErrorData.length > 0) {
            blobError = blobErrorData
        }
    } catch (err: any) { }
    const response = responseError.response || defaultResponse;
    const errors = response.data && (response.data.errors || response.data.error || response.data.message);
    return {
        code: response.status,
        message: errors || blobError,
    };
};