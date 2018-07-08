import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebasedb/firebasedb';

/**
 * Generated class for the NuevoBotonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevo-boton',
  templateUrl: 'nuevo-boton.html',
})
export class NuevoBotonPage {
  private dispositivo = {nombre: '', ip: '', puerto: '',tiempoActivo: '', icon: ''};

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private dbFirebase: FirebaseDbProvider, public alerta: AlertController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoBotonPage');
  }
  guardarDispositivo(){
    let dispositivo = this.dispositivo;
    this.dbFirebase.guardaDispositivo(dispositivo).then(res=>{
        const miAlerta = this.alerta.create({
          title: "¡Creado con éxito!",
          message: "El dispositivo " + dispositivo.nombre + " fue creado con éxito.",
          buttons: ["Ok"]
        })
        miAlerta.present();
        this.navCtrl.pop();
        }).catch(error =>{
          const miAlerta = this.alerta.create({
            title: "Error",
            message: error,
            buttons: ["Ok"]
          })
          miAlerta.present();
        })
  }
}
