export interface UrlTreeResolve {
  route: string;
  querys?: QueryUrlResolve;
}

export interface QueryUrlResolve {
  [key: string]: string;
}

export interface ImageSize {
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
}
