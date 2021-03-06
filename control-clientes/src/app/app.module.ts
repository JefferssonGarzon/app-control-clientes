import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadboardComponent } from './components/headboard/headboard.component';
import { BoardComponent } from './components/board/board.component';
import { CustomersComponent } from './components/customers/customers.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { ClientService } from './services/client.service';
import { AuthGuard } from './guards/auth.guard';
import { ConfigurationService } from './services/configuration.service';


@NgModule({
  declarations: [
    AppComponent,
    HeadboardComponent,
    BoardComponent,
    CustomersComponent,
    EditClientComponent,
    LoginComponent,
    RegisterComponent,
    ConfigurationComponent,
    PageNotFoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firestore, 'control-clientes'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [ ClientService, 
    AuthGuard,
    ConfigurationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
