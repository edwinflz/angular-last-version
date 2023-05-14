export interface ResponseSoaApi<T, U = []> {
  success: boolean;
  errors: U[];
  value: T;
}
