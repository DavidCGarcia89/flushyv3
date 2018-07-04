import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Dispositivo } from '../../model';
import { FirebaseDbProvider } from '../../providers/firebasedb/firebasedb';

/**
 * Generated class for the EditarBotonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-boton',
  templateUrl: 'editar-boton.html',
})
export class EditarBotonPage {
  private dispositivo: Dispositivo;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dbFirebase: FirebaseDbProvider, public alerta: AlertController) {
    this.dispositivo = navParams.data.dispositivo;
  }

  cambiarBoton() {
    let dispositivo = this.dispositivo;
    this.dbFirebase.editarDispositivo(dispositivo).then(res=>{
        const miAlerta = this.alerta.create({
          title: "¡Modificado con éxito!",
          message: "El dispositivo " + dispositivo.nombre + " fue modificado con éxito.",
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
    console.log('ionViewDidLoad EditarBotonPage');
  }

}
