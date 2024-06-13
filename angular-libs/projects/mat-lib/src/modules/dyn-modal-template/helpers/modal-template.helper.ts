import { BodyTextModel, ModalTemplateModel } from '../components/modal-template/modal-template.model';

import { ButtonControlHelper } from './button-control.helper';

export class ModalTemplateHelper<T> {
  /**
   * button text
   */
  btnText?: string;
  /**
   * button color
   */
  btnColor?: 'primary' | 'accent' | 'secondary' | 'warn';
  /**
   * Title of the modal
   */
  modalTitle?: string;
  /**
   * body text that is either a string, html, or a form
   */
  bodyText?: BodyTextModel;
  /**
   * whether the close button is visible
   */
  closeBtn?: boolean;
  /**
   * Info text that is sometimes needed
   */
  info?: string;
  /**
   * Cancel button text incase it makes sense to change it
   */
  cancelBtnText?: string;
  /**
   * Value to be returned
   */
  value?: T;
  /**
   * button control for action bar, can have one or multiple buttons
   */
  btnControl?: ButtonControlHelper[];
  /**
   * allow user to click off of modal or not to allow
   */
  disableClose?: boolean;

  constructor(options: ModalTemplateModel<T>) {
    this.btnText = options.btnText ?? 'Open Modal';
    this.btnColor = options.btnColor ?? 'primary';
    this.modalTitle = options.modalTitle ?? 'Testing';
    this.bodyText = options.bodyText ?? 'Testing Body Text';
    this.closeBtn = options.closeBtn ?? false;
    this.info = options.info ?? undefined;
    this.cancelBtnText = options.cancelBtnText ?? undefined;
    this.value = options.value ?? undefined;
    this.btnControl = options.btnControl ?? [new ButtonControlHelper({})];
    this.disableClose = options.disableClose ?? false;
  }
}
