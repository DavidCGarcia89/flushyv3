import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Dispositivo } from '../../model';
import { FirebaseDbProvider } from '../../providers/firebasedb/firebasedb';
import { RaspberryProvider } from '../../providers/raspberry/raspberry';
import { EditarBotonPage } from '../editar-boton/editar-boton';
import { StatusBotonPage } from '../status-boton/status-boton';
import { PulsarBotonPage } from '../pulsar-boton/pulsar-boton';

/**
 * Generated class for the BotonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boton',
  templateUrl: 'boton.html'
})
export class BotonPage {
  private dispositivo: Dispositivo;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dbFirebase: FirebaseDbProvider, private activeRaspberry: RaspberryProvider, public alerta: AlertController, public loadingCtrl: LoadingController) {
    this.dispositivo = navParams.data.dispositivo;
  }

  private ionViewDidLoad() {
    console.log('ionViewDidLoad BotonPage');
  }
  private statusRaspberry() {
    const loading = this.loadingCtrl.create({
    });
    loading.present();
    this.activeRaspberry.checkStatusRaspberry(this.dispositivo.ip, this.dispositivo.puerto)
    .subscribe((status) => {
      console.log(status);
      loading.dismiss();
      this.navCtrl.push(StatusBotonPage, {dispositivo: this.dispositivo, statusR: status});
    },(error) => {
      loading.dismiss();
      const miAlerta = this.alerta.create({
        title: "Error",
        message: "No se pudo alcanzar el dispositivo.",
        buttons: ["Ok"]
      });
      miAlerta.present();
    });
  }
  private pulsarBoton(tipo) {
    this.navCtrl.push(PulsarBotonPage, {dispositivo: this.dispositivo, tipoPulsador: tipo});
  }
  private editarBoton() {
    this.navCtrl.push(EditarBotonPage, {dispositivo: this.dispositivo});
  }
  private comprobarConexion() {
    const loading = this.loadingCtrl.create({
      content: 'Testeando conexión...'
    });
    loading.present();
    this.activeRaspberry.checkConexionRaspberry(this.dispositivo.ip, this.dispositivo.puerto)
    .subscribe((data) => {
      loading.dismiss();
      const miAlerta = this.alerta.create({
        title: "Conexión Establecida",
        message: "La raspberry está conectada a su dispositivo.",
        buttons: ["Ok"]
      });
      miAlerta.present();
    },
    (error) => {
      loading.dismiss();
      console.log(error);
      const miAlerta = this.alerta.create({
        title: "Error",
        message: "No se pudo alcanzar el dispositivo.",
        buttons: ["Ok"]
      });
      miAlerta.present();
    }
  );
  }
  private removeBoton() {
    const alert = this.alerta.create({
      title: '¿Eliminar Botón?',
      message: '¿Estás seguro de que quieres eliminar el botón?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.dbFirebase.removeDispositivo(this.dispositivo.id).then(res => {
              const miAlerta = this.alerta.create({
                title: "¡Eliminado con éxito!",
                message: "El dispositivo " + this.dispositivo.nombre + " fue eliminado con éxito.",
                buttons: ["Ok"]
              });
              miAlerta.present();
              this.navCtrl.pop();
              }).catch(error => {
                const miAlerta = this.alerta.create({
                  title: "Error",
                  message: error,
                  buttons: ["Ok"]
                });
                miAlerta.present();
              });
          }
        }
      ]
    });
    alert.present();
  }
}
