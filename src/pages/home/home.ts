import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebasedb/firebasedb';
import { NuevoBotonPage } from '../nuevo-boton/nuevo-boton';
import { Dispositivo } from '../../model';
import { BotonPage } from '../boton/boton';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private listaDispositivos: Array<Dispositivo> = [];
  private numDispositivos;
  constructor(public navCtrl: NavController, private dbFirebase: FirebaseDbProvider) {
    console.log("Constructor Home");
    this.dbFirebase.getDispositivos().valueChanges()
    .subscribe( lista => {
      console.log(lista)
      this.listaDispositivos = lista;
      this.numDispositivos = lista.length;
    })
  }

  onViewWillEnter() {
    console.log("Pagina Home cargada");
    this.dbFirebase.getDispositivos().valueChanges()
    .subscribe( lista => {
      console.log(lista)
      this.listaDispositivos = lista;
      this.numDispositivos = lista.length;
    })
  }
  nuevoBoton() {
    this.navCtrl.push(NuevoBotonPage);
  }
  detallesBoton(dispositivo) {
    this.navCtrl.push(BotonPage, {dispositivo: dispositivo});
  }
}
