import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  token:string;

  constructor(private db: AngularFirestore, private authService:AngularFireAuth, private router:Router) {
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

   getClient(id:string){
     this.clientDoc = this.db.doc<Client>(`clientes/${id}`);
     this.client = this.clientDoc.snapshotChanges().pipe(
       map( action => {
         if(action.payload.exists === false){
           return null;
         }else{
           const data = action.payload.data() as Client;
           data.id = action.payload.id;
           return data;
         }
       })
     );
     return this.client;
   }

   modifyClient(client){
    this.clientDoc = this.db.doc(`clientes/${client.id}`);
    this.clientDoc.update(client);
   }

   deleteClient(id){
    this.clientDoc = this.db.doc(`clientes/${id}`);
    this.clientDoc.delete();
   }

  //  Login

  login(form){
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(form.email, form.password)
      .then( data => resolve(data),
      error => reject(error))
    })
  }

  getAuth(){
    return this.authService.authState.pipe(
      map( auth => auth)
    );
  }

  logOut(){
    this.authService.signOut();
  }

  singUp(form){
    return new Promise( (resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(form.email, form.password)
      .then( data => resolve(data),
      error => reject(error))
    });
  }
}
