import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {


  clients:Client[] = [];
  closeResult:string = '';

  clientForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    saldo: new FormControl('', Validators.compose([Validators.required, Validators.min(400000)])),
  })

  constructor(private clientService: ClientService, private modalService: NgbModal) { }

  ngOnInit(){
    this.clientService.getClients().subscribe(
      clients => {
        this.clients = clients;
      }
    )
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

  open(content){
    this.modalService.open(content, {ariaLabelledBy: "modal-basic-title", size: 'md'}).result.then(
      result => {
        this.closeResult = `Close with: ${result}`;
      }, reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason:any):string{
    if(reason === ModalDismissReasons.ESC){
      return 'by pressing ESC';
    } else if(reason === ModalDismissReasons.BACKDROP_CLICK){
      return 'by clicking on a backdrop';
    }else{
      return `with: ${reason}`;
    }
  }

  // Edi-client form
  add(){
    console.log(this.clientForm.value);
    this.clientService.addCliente(this.clientForm.value);
    this.clientForm.reset();
  }

  clear(){
    this.clientForm.reset();
  }
}
