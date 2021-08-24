import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {


  clients:Client[] = [];
  constructor(private clientService: ClientService) { }

  ngOnInit(){
    this.clientService.getClients().subscribe(
      clients => {
        this.clients = clients;
        console.log(this.clients);
      }
    )
    console.log(this.clients);
  }

  getSaldoTotal(){
    let saldoTotal:number = 0;
    if(this.clients){
      this.clients.forEach( client => {
        saldoTotal += client.saldo;
      })
    }
    return saldoTotal;
  }
}
