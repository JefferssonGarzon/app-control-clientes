import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { CustomersComponent } from './components/customers/customers.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'signup', component: RegisterComponent},
  { path: 'board', 
    component: BoardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'customers', component: CustomersComponent},
      { path: 'configuration', component: ConfigurationComponent},
      { path: 'client/edit/:id', component:EditClientComponent},
    ]
  },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
