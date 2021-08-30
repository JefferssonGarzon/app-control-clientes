import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  cod:string;
  searchClient: Client = {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };

  editForm = new FormGroup({
    nombre: new FormControl('', Validators.compose([Validators.required])),
    apellido: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    saldo: new FormControl('', Validators.compose([Validators.required, Validators.min(400000)])),
    id: new FormControl(``)
  })

  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cod = this.route.snapshot.params['id']
    this.clientService.getClient(this.cod).subscribe(
      client => {
        this.searchClient = client;
      }
    )
  }

  edit(){
    this.editForm.value.id = this.searchClient.id;
    this.clientService.modifyClient(this.editForm.value);
    this.router.navigate(['/']);
  }

}
