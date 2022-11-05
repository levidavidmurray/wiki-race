
export const toQueryParams = (params: object): string => {
    let paramStr = ''
    for (let param in params) {
        paramStr += `${param}=${params[param]}&`
    }
    return paramStr
}

export interface TimeDisplayType {
    minutes: string;
    seconds: string;
    milliseconds: string;
}

export const convertMS = (inputMs: number): TimeDisplayType =>  {
    let m, s, ms;
    s = Math.floor(inputMs / 1000);
    ms = ((inputMs / 1000) - s).toFixed(2)
    m = Math.floor(s / 60);
    s = s % 60;
    m = m % 60;

    if (s < 10) {
        s = `0${s}`
    }
    if (m < 10) {
        m = `0${m}`
    }

    ms = ms.substring(2, ms.length)

    return {
        minutes: m,
        seconds: s,
        milliseconds: ms,
    }
  };