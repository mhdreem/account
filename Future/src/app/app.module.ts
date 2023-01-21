import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {environment} from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationdialogComponent } from './modules/shared/components/confirmationdialog/confirmationdialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationdialogComponent,
    
    
  ],
  imports: 
  [
    BrowserModule,
    AppRoutingModule,
  
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatSelectModule,
   
    HttpClientModule,
    MatDialogModule,
    MatButtonModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
