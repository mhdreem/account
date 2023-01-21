import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { GeneralAccountsComponent } from './general-accounts/general-accounts-list/general-accounts-list.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import { GeneralAccountsEditComponent } from './general-accounts/general-accounts-edit/general-accounts-edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxHoverOpacityModule } from 'ngx-hover-opacity';
import { PrintComponent } from './general-accounts/print/print.component';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  declarations: [
    AccountsComponent,
    GeneralAccountsComponent,
    GeneralAccountsEditComponent,
    PrintComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    MatTreeModule,
    MatRadioModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    NgxHoverOpacityModule,
    NgxPrintModule,
  ]
})
export class AccountsModule { }
