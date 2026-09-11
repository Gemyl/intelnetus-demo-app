import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { MetadataExtractionModule } from './metadata-extraction/metadata-extraction.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToastsModule } from '../shared/Toast/toasts.module';
import { providePrimeNG } from 'primeng/config';
import Aura from "@primeng/themes/aura";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    MetadataExtractionModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot({}),
    ToastsModule
],
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
