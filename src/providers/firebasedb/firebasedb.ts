import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Dispositivo } from '../../model';
/*
  Generated class for the FirebaseDbProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseDbProvider {
  private listaDevices: Array<Dispositivo> = [];
  private uri: string;
  constructor(public afDB: AngularFireDatabase, public auth: AuthProvider) {
    console.log("Firebase Provider")
  }

  guardaDispositivo(dispositivo){
    dispositivo.id  = Date.now().toString();
    console.log(dispositivo);
    this.listaDevices.push(dispositivo);
    const uri = 'users/' + this.auth.User + '/dispositivos/' + dispositivo.id;
    return this.afDB.database.ref(uri).set(dispositivo);
  }

  getDispositivos() {
    console.log("Funcion getDispositivos");
    this.uri = 'users/' + this.auth.User + '/dispositivos/';
    return this.afDB.list<Dispositivo>(this.uri);
  }

  editarDispositivo(dispositivo){
    const uri = 'users/' + this.auth.User + '/dispositivos/' + dispositivo.id;
    let encontrado = false;
    for (let i = 0; i<this.listaDevices.length && encontrado === false; i++) {
      if (this.listaDevices[i].id === dispositivo.id) {
        this.listaDevices[i] = dispositivo;
        encontrado = true;
      }
    }
    return this.afDB.database.ref(uri).set(dispositivo);
  }
  removeDispositivo(id:string) {
    const uri = 'users/' + this.auth.User + '/dispositivos/';
    let refLista = this.afDB.list<Dispositivo>(uri);
    return refLista.remove(id);
  }
}