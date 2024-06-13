import { Component, Type } from '@angular/core';
import { ModalOptions, ModalSizeOptions, ModalTemplates } from '../models/modal.model';

import { MatDialogConfig } from '@angular/material/dialog';

export class Modal {
  /**
   * Default modal options to display template elements
   */
  static defaultModalOptions: ModalOptions = {
    header: true,
    footer: true,
    cancel: true,
    close: false,
    title: 'Attention',
    size: ModalSizeOptions.MEDIUM,
  };
  /**
   * Defaults modal configuration view and functionality
   */
  static defaultModalConfig: MatDialogConfig = {
    data: null,
    ariaDescribedBy: null,
    ariaLabel: null,
    ariaLabelledBy: null,
    autoFocus: true,
    backdropClass: undefined,
    closeOnNavigation: false,
    componentFactoryResolver: undefined,
    direction: 'ltr',
    disableClose: true,
    hasBackdrop: false,
    height: '',
    id: '',
    maxHeight: undefined,
    maxWidth: undefined,
    minHeight: undefined,
    minWidth: undefined,
    panelClass: '',
    position: { top: '', bottom: '', left: '', right: '' },
    restoreFocus: true,
    role: undefined,
    scrollStrategy: undefined,
    viewContainerRef: undefined,
    width: '',
  };
  /**
   * Default view templates
   */
  static defaultTemplates: ModalTemplates = {
    error: undefined,
    header: undefined,
    content: undefined,
    actionsLeft: undefined,
    actionsRight: undefined,
  };
  /**
   * Modal Component Build
   */
  public component: Type<any> | Component;
  /**
   * Modal Options
   */
  public options = Modal.defaultModalOptions;
  /**
   * Dialog configurations
   */
  public dialog = Modal.defaultModalConfig;
  /**
   * Modal templates
   */
  public templates: ModalTemplates;

  constructor(component: Type<any> | Component, options?: ModalOptions, dialog?: MatDialogConfig, templates?: ModalTemplates) {
    this.component = component;
    this.options = options ? Object.assign({}, Modal.defaultModalOptions, options) : Modal.defaultModalOptions;
    this.dialog = dialog ? Object.assign({}, Modal.defaultModalConfig, dialog) : Modal.defaultModalConfig;
    this.templates = templates ? Object.assign({}, Modal.defaultTemplates, templates) : Modal.defaultTemplates;
  }
}
