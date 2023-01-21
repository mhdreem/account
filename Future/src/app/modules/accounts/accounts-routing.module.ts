import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { GeneralAccountsComponent } from './general-accounts/general-accounts-list/general-accounts-list.component';

const routes: Routes = [
  // { path: '', component: AccountsComponent },
  {path: 'module',
  component: AccountsComponent,
  children:[

    {
      path: 'generalAccounts',
      component:GeneralAccountsComponent
      
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
