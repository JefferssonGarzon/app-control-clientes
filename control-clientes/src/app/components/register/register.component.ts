import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  regForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(7)]))
  })
  constructor(private router:Router, private clientService: ClientService, private flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
    this.clientService.getAuth().subscribe( auth => {
      if(auth){
        this.router.navigate(['/board/customers']);
      }
    })
  }

  signUp(){
    this.clientService.singUp(this.regForm.value).then(
      res => {
        this.router.navigate(['/board/customers'])
      }
    ).catch(
      error => {  
        this.flashMessagesService.show( error.message, {
          cssClass: 'alert-danger', timeout: 5000
        });
      }
    );
  }
}
