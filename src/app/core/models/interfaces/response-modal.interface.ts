import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

export type ResponseModal = {
  title: string;
  content: string;
  firstButtonTxt: string;
  isError: boolean;
  secondButtonTxt?: string;
  showSecondButton?: boolean;
}

export type ModalRefFunction = (data: ResponseModal) => NgbModalRef;
