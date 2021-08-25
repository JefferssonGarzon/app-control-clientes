import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private db: AngularFirestore) {
    this.clientCollection = db.collection('clientes', ref => ref.orderBy('nombre', 'asc'));
   }

   getClients(): Observable<Client[]>{
     this.clients = this.clientCollection.snapshotChanges().pipe(
       map( changes => {
         return changes.map( action => {
           const datos = action.payload.doc.data() as Client;
           datos.id = action.payload.doc.id;
           return datos;
         })
       })
     );
     return this.clients;
   }

   addCliente(client: Client){
     this.clientCollection.add(client);
   }
}
