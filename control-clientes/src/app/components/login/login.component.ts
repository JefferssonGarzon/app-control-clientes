import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Configuration } from 'src/app/models/configuration.model';
import { ClientService } from 'src/app/services/client.service';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(7)]))
  })

  permitirRegistro:boolean = true;

  constructor(private clientService: ClientService, 
    private router:Router, 
    private flashMessage: FlashMessagesService,
    private configService: ConfigurationService) { }

  ngOnInit(): void {
    this.clientService.getAuth().subscribe( auth => {
      if(auth){
        this.router.navigate(['/board/customers']);
      }
    })

    this.configService.getConfiguration().subscribe(
      (configuration: Configuration) => {
        this.permitirRegistro = configuration.permitirRegistro;
      }
      )
  }

  login(){
    this.clientService.login(this.loginForm.value)
    .then(res => {
      this.router.navigate(['/board/customers']);
    }).catch(
      error => {
        this.flashMessage.show( error.message, {
          cssClass: "alert-danger", timeout: 5000
        })
      }
    );
  }
}
