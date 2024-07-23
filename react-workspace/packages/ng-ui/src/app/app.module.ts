import { Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactWrapperComponent } from './react-wrapper';
import { TwCheckboxComponent } from './tw-checkbox';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TwCheckboxComponent,
    ReactWrapperComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const ReactWrapperElement = createCustomElement(ReactWrapperComponent, { injector });
    customElements.define('react-wrapper-element', ReactWrapperElement);
  }

  ngDoBootstrap() {}
}
