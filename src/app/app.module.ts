import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapaV2Component } from './mapa-v2/mapa-v2.component';

import { AgmCoreModule } from '@agm/core'

@NgModule({
  declarations: [
    AppComponent,
    MapaV2Component
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBXoe3vvdGGosbpLVZqUncQDgiW4UAbl58'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
