import { ButtonControlModel } from '../components/modal-template/modal-template.model';

export class ButtonControlHelper {
  /**
   * Text of the button
   */
  btnText?: string;
  /**
   * Color of the button
   */
  btnColor?: string;
  /**
   * Whether the button is disabled by default
   */
  btnDisabled?: boolean;

  valueOverride?: string;
  /**
   * Tag for Cypress
   */
  dataCy?: string;

  constructor(options: ButtonControlModel) {
    this.btnText = options.btnText ?? 'Confirm';
    this.btnColor = options.btnColor ?? 'primary';
    this.btnDisabled = options.btnDisabled ?? false;
    this.valueOverride = options.valueOverride ?? undefined;
    this.dataCy = options.dataCy ?? undefined;
  }
}
