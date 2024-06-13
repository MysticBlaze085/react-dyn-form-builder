import { Component, Inject, Injector, OnInit, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Modal } from '../../helpers';

@Component({
  selector: 'lyn-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  /**
   * Reads the ViewContainerRef component and allows component access
   */
  @ViewChild('component', { read: ViewContainerRef, static: true })
  public componentTarget!: ViewContainerRef;
  /**
   * Action buttons in template on the left
   */
  public actionsLeft!: TemplateRef<any>;
  /**
   * Action buttons in template on the right
   */
  public actionsRight!: TemplateRef<any>;
  /**
   * Displays clear button
   */
  public isClose: boolean = false;

  constructor(private injector: Injector, @Inject(MAT_DIALOG_DATA) public modal: Modal) {}

  public ngOnInit() {
    const options = {
      index: 0,
      injector: Injector.create({
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: this.modal.dialog.data,
          },
        ],
        parent: this.injector,
      }),
    };
    const componentRef: any = this.componentTarget.createComponent(this.modal.component as Type<any>, options);
    this.actionsLeft = componentRef.instance.actionsLeftRef;
    this.actionsRight = componentRef.instance.actionsRightRef;
  }
}
