import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxAngMatComponent } from 'ngx-ang-mat';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxAngMatComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
