import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';
import { ModalSideDrawerService } from './api';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'lyn-modal-side-drawer',
  templateUrl: './modal-side-drawer.component.html',
  styleUrls: ['./modal-side-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalSideDrawerComponent implements OnInit {
  /**
   * Sidenav template control MatSidenav
   */
  @ViewChild('sideDrawer') sideDrawer?: MatSidenav;
  @ViewChild('component', { read: ViewContainerRef, static: true })
  public componentTarget!: ViewContainerRef;

  openMenu$!: Observable<boolean>;

  constructor(private readonly modalSideDrawerService: ModalSideDrawerService, public viewContainerRef: ViewContainerRef) {}

  public ngOnInit() {
    this.openMenu$ = this.modalSideDrawerService.openModalDrawr$.pipe(
      tap((result: boolean) => {
        if (result && this.modalSideDrawerService.component) {
          this.componentTarget.createComponent(this.modalSideDrawerService.component as any);
        } else {
          this.componentTarget.clear();
        }
      })
    );
  }
  /**
   * Closes modal side drawer
   */
  public closeMenu() {
    this.modalSideDrawerService.close();
  }
}
