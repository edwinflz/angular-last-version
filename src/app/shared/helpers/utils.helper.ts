import { QueryUrlResolve, UrlTreeResolve } from '@interfaces/utils.interface';

export const isStringAndNotEmpty = (val: any): boolean => typeof val === 'string' && val !== '';

export const isObjectEmpty = (obj: Object) =>
  Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;

export const resolveUrl = (url: string): UrlTreeResolve => {
  const urlSplit = url.split('?');
  return {
    route: urlSplit[0],
    querys: !!urlSplit[1] ? buildQueryParams(urlSplit[1]) : {},
  };
};

const buildQueryParams = (query: string): QueryUrlResolve => {
  const querys = query.split('&');
  let listParameters = {};
  querys.forEach((item) => {
    const parameter = item.split('=');
    listParameters = {
      ...listParameters,
      [parameter[0]]: decodeURI(parameter[1]),
    };
  });
  return listParameters;
};

export const base64ToBlob = (dataURI: string): Blob => {
  const splitDataURI = dataURI.split(',')
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++)
    ia[i] = byteString.charCodeAt(i)
  return new Blob([ia], { type: mimeString });
}
