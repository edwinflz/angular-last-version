export interface CountryTimeZone {
  id: string;
  name: string;
  code: string;
  languageId: string;
  imgFlag: string;
  value: string;
  isoCurrency: string;
  isoCode: string;
}

export interface Country {
  id: number;
  code: string;
  name: string;
  languageId: number;
}

export interface State {
  id: string;
  code: string;
  nameEnglish: string;
  nameSpanish: string;
  countryId: string;
  createdDate: string;
  createdUser: string;
  lastModifiedDate: string;
  lastModifiedUser: string;
  lastModifiedUserEmail: string;
  migId: string;
}

export interface Department {
  id: string;
  code: string;
  nameEnglish: string;
  nameSpanish: string;
  countryId: string;
  stateId: string;
  createdDate: string;
  createdUser: string;
  lastModifiedDate: string;
  lastModifiedUser: string;
  lastModifiedUserEmail: string;
  migId: string;
}

export interface District {
  id: string;
  code: string;
  nameEnglish: string;
  nameSpanish: string;
  countryId: string;
  stateId: string;
  departmentId: string;
  createdDate: string;
  createdUser: string;
  lastModifiedDate: string;
  lastModifiedUser: string;
  lastModifiedUserEmail: string;
  migId: string;
}

export interface CountryWithCode {
  id: string;
  code: string;
  createdDate: Date;
  createdUser: Date;
  isoCode: string;
  isoCurrency: string;
  language: string;
  languageId: string;
  lastModifiedDate: Date;
  lastModifiedUser: string;
  lastModifiedUserEmail: string;
  migId: string;
  name: string;
  organizations: any[]
}

export interface IUserCountry {
  CountryName: string,
  IsoCurrencyCode: string,
  IsoCountryCode: string
}
