import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController  } from 'ionic-angular';
import { Dispositivo } from '../../model';
import { RaspberryProvider } from '../../providers/raspberry/raspberry';
import * as round from 'round10'; 

/**
 * Generated class for the PulsarBotonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pulsar-boton',
  templateUrl: 'pulsar-boton.html',
})
export class PulsarBotonPage {
  private dispositivo: Dispositivo;
  private tipoPulsador: string; //Activar Pin
  private angIni: Number = 4.5;
  private angFin: Number = 10.5;
  private angIniM: Number = 45;
  private angFinM: Number = 105;
  private durIni: Number = 5;
  private durFin: Number = 5;
  private durIniM: Number = 5000;
  private durFinM: Number = 5000;
  constructor(public navCtrl: NavController, public navParams: NavParams, private activeRaspberry: RaspberryProvider, public alerta: AlertController, public loadingCtrl: LoadingController) {
    this.dispositivo = this.navParams.data.dispositivo;
    this.tipoPulsador = this.navParams.data.tipoPulsador;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PulsarBotonPage');
  }
  private activarPin() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => {
    }, 2000);
    let titulo;
    let mensaje;
    this.activeRaspberry.checkPinRaspberry(this.dispositivo.ip, this.dispositivo.puerto, this.dispositivo.pin)
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
  private activarServo() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => {
    }, 2000);
    let titulo;
    let mensaje;
    this.activeRaspberry.checkServoRaspberry(this.dispositivo.ip, this.dispositivo.puerto, this.dispositivo.pin, this.durIniM, this.durFinM, this.angIni, this.angFin)
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
  private sumarPin() {
    if (this.dispositivo.pin < 26)
      this.dispositivo.pin = +this.dispositivo.pin + 1;
  }
  private restarPin() {
    if (this.dispositivo.pin > 2)
      this.dispositivo.pin = +this.dispositivo.pin - 1;
  }
  private sumarAngIni() {
    if (this.angIni < 16) {
      this.angIni = round.round10(+this.angIni + 0.1, -1);
    }
  }
  private restarAngIni() {
    if (this.angIni > 0) {
      this.angIni = round.round10(+this.angIni - 0.1, -1);
    }
      
  }
  private sumarAngFin() {
    if (this.angFin < 16) {
      this.angFin = round.round10(+this.angFin + 0.1, -1);
    }
    
  }
  private restarAngFin() {
    if (this.angFin > 0) {
      this.angFin = round.round10(+this.angFin - 0.1, -1);
    }
  }
  private sumarDurIni() {
    if (this.durIni < 10) {
      this.durIni = +this.durIni + 1;
      this.durIniM = +this.durIniM + 1000;
    }
    
  }
  private restarDurIni() {
    if (this.durIni > 1) {
      this.durIni = +this.durIni - 1;
      this.durIniM = +this.durIniM - 1000;
    }
  }
  private sumarDurFin() {
    if (this.durFin < 10) {
      this.durFin = +this.durFin + 1;
      this.durFinM = +this.durFinM + 1000;
    }
  }
  private restarDurFin() {
    if (this.durFin > 1) {
      this.durFin = +this.durFin - 1;
      this.durFinM = +this.durFinM - 1000;
    }
  }
}
