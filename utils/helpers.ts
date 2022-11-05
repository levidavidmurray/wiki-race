
export const toQueryParams = (params: object): string => {
    let paramStr = ''
    for (let param in params) {
        paramStr += `${param}=${params[param]}&`
    }
    return paramStr
}

export const convertMS = (ms: number): string =>  {
    let m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    m = m % 60;

    if (s < 10) {
        s = `0${s}`
    }
    if (m < 10) {
        m = `0${m}`
    }

    return `${m}:${s}`;
  };