import { inject } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { MODAL_CONFIG } from "@models/constants";
import { ModalRefFunction, ResponseModal } from "@models/interfaces";
import { ResponseModalComponent } from "@components/response-modal/response-modal.component";

export const getModalResponseRef = (): ModalRefFunction => {
  const modal = inject(NgbModal);
  return (data: ResponseModal): NgbModalRef => {
    const modalRef = modal.open(ResponseModalComponent, { ...MODAL_CONFIG });
    modalRef.componentInstance.response = data;
    return modalRef;
  }
}
