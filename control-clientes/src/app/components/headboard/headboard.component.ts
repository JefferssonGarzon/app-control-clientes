import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-headboard',
  templateUrl: './headboard.component.html',
  styleUrls: ['./headboard.component.css']
})
export class HeadboardComponent implements OnInit {

  isMenuCollapsed:boolean = true;

  isLoggedIn:boolean = false;
  loggedInUser:string;
  constructor(private clientService: ClientService, private router:Router) { }

  ngOnInit(): void {
    this.clientService.getAuth().subscribe(
      auth => {
        if(auth){
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
        }else{
          this.isLoggedIn = false;
        }
      }
    )
  }

  logOut(){
    this.clientService.logOut();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

}
