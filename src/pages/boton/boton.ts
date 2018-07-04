import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Dispositivo } from '../../model';
import { FirebaseDbProvider } from '../../providers/firebasedb/firebasedb';
import { RaspberryProvider } from '../../providers/raspberry/raspberry';
import { EditarBotonPage } from '../editar-boton/editar-boton';

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
  private editarBoton() {
    this.navCtrl.push(EditarBotonPage, {dispositivo: this.dispositivo});
  }
  private pulsarBoton() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => {
    }, 2000);
    let titulo;
    let mensaje;
    this.activeRaspberry.peticionRaspberry(this.dispositivo.ip, this.dispositivo.puerto, this.dispositivo.pin)
    .subscribe(
      (data) => {
        loading.dismiss();
        switch (data.respuesta) {
          case "Ok":
            titulo = "¡Llamada con éxito!";
            mensaje = "El botón fue activado correctamente =)";
            break;
          case "Sin pin":
            titulo = "Añade un Pin";
            mensaje = "Es necesario añadir un pin GPIO";
            break;
          case "Pin Incorrecto":
            titulo = "PIN incorrecto";
            mensaje = "El pin debe tener un valor entre 2 y 26";
            break;
          case "Error":
            titulo = "¡Cuidado!";
            mensaje = "¡Es posible que algo saliera mal en tu dispositivo!";
            break;
          default:
            titulo = "Acción sin contemplar";
            mensaje = "El desarrollador no ha contemplado este escenario. ¡Ten cuidado con tu dispositivo!";
            break;
        }
        const miAlerta = this.alerta.create({
          title: titulo,
          message: mensaje,
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
