import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material'

import { AppComponent } from './app.component';
import { DataSelectComponent } from './data-select/data-select.component';

import 'hammerjs';
import { LidPlotComponent } from './lid-plot/lid-plot.component';

@NgModule({
  declarations: [
    AppComponent,
    DataSelectComponent,
    LidPlotComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
