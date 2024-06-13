import { ButtonControlHelper } from '../../helpers/button-control.helper';
import { ControlBase } from '@core/shared/modules/lyn-dyn-form/helpers';
import { FieldControlModel } from '@core/shared/modules/dyn-form-control/components/field/api';

export interface ModalTemplateModel<T> {
  btnText?: string;
  btnColor?: 'primary' | 'accent' | 'secondary' | 'warn';
  modalTitle?: string;
  bodyText?: BodyTextModel;
  closeBtn?: boolean;
  info?: string;
  cancelBtnText?: string;
  value?: T;
  btnControl?: ButtonControlHelper[];
  disableClose?: boolean;
}

export type BodyTextModel = string | ControlBase | ControlBase[] | FieldControlModel | FieldControlModel[];

export interface ButtonControlModel {
  btnText?: string;
  btnColor?: string;
  btnDisabled?: boolean;
  valueOverride?: string;
  dataCy?: string;
}
