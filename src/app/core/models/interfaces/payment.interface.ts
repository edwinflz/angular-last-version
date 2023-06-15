import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

export interface SaveCard {
  type: string;
  card: InternationalCardModel | LocalCardModel;
  modalRef?: NgbModalRef;
}

export interface LocalCardModel {
  cardName: string;
  payerlastName: string;
  cardToken: string;
  isFavourite: boolean;
  address: string;
  country: string;
  postalCode: string;
  state: string;
  city: string;
  district: string;
  saveCard: boolean;
  isDefaultCard: boolean;
  payerDocument: string;
  maskedCVV?: string;
  cardNumber?: string;
  expiredDate?: string;
  payerEmail?: string;
  userId?: string;
}

export interface InternationalCardModel {
  cardName: string;
  payerlastName: string;
  cardNumber: string;
  expiredDate: string;
  maskedCVV: string;
  isFavourite: boolean;
  address: string;
  country: string;
  state: string;
  stateCode: string;
  city: string;
  district: string;
  postalCode: string;
  saveCard: boolean;
  isDefaultCard: boolean;
  payerEmail: string;
  payerDocument: string;
  cardToken?: string;
  userId?: string;
}
