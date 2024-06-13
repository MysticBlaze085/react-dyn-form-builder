import { TemplateRef } from '@angular/core';

export interface ModalOptions {
  header?: boolean;
  footer?: boolean;
  cancel?: boolean;
  close?: boolean;
  size?: ModalSizeOptions;
  title?: string;
  dataCy?: string;
}

export interface ModalTemplates {
  error?: TemplateRef<any>;
  header?: TemplateRef<any>;
  content?: TemplateRef<any>;
  actionsLeft?: TemplateRef<any>;
  actionsRight?: TemplateRef<any>;
}

export enum ModalSizeOptions {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  EXTRA_LARGE = 'EXTRA-LARGE',
}
