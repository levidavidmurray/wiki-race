
export const toQueryParams = (params: object): string => {
    let paramStr = ''
    for (let param in params) {
        paramStr += `${param}=${params[param]}&`
    }
    return paramStr
}
