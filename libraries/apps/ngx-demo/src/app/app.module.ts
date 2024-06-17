import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CardModule, NgxAngMatComponent } from 'ngx-ang-mat';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxAngMatComponent, CardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
