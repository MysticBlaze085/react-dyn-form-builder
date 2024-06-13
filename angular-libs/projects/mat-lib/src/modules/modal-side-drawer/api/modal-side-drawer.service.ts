import { BehaviorSubject, Observable } from 'rxjs';
import { Component, Injectable, Type, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalSideDrawerService {
  public rootViewContainer!: ViewContainerRef;
  public component!: Type<any> | Component;
  private openModalDrawerSubject = new BehaviorSubject(false);
  public openModalDrawr$: Observable<boolean> = this.openModalDrawerSubject.asObservable();

  public setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  public addDynamicComponent(component: Type<any> | Component): any {
    const factory = this.rootViewContainer.createComponent(component as Type<any>);
    this.rootViewContainer.insert(factory.hostView);
  }

  public clearView() {
    this.rootViewContainer.clear();
  }

  public toggle() {
    this.openModalDrawerSubject.next(!this.openModalDrawerSubject.value);
  }

  public close() {
    this.openModalDrawerSubject.next(false);
  }
}
