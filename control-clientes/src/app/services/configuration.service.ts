import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Configuration } from '../models/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  configurationDoc: AngularFirestoreDocument<Configuration>;
  configuration: Observable<Configuration>;

  // id unico de la coleccion de configuracion
  id:string = "1";
  constructor(private db: AngularFirestore) { }

  getConfiguration(): Observable<Configuration>{
    this.configurationDoc = this.db.doc<Configuration>(`configuracion/${this.id}`);
    this.configuration = this.configurationDoc.valueChanges();
    return this.configuration;
  }

  modifyConfiguration(config: Configuration){
    this.configurationDoc = this.db.doc<Configuration>(`configuracion/${this.id}`);
    this.configurationDoc.update(config);
  }
}
