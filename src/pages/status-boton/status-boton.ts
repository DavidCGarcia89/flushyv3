import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusRaspberry, Dispositivo } from '../../model';
import { RaspberryProvider } from '../../providers/raspberry/raspberry';

/**
 * Generated class for the StatusBotonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-status-boton',
  templateUrl: 'status-boton.html',
})
export class StatusBotonPage {
  private status: StatusRaspberry = {
    temperatura: 0,
    memoriaTotal: 0,
    memoriaUsada: 0,
    memoriaLibre: 0,
    percentMemUsed: 0,
    uptime: ""
  }
  private dispositivo: Dispositivo;
  constructor(public navCtrl: NavController, public navParams: NavParams, private raspberry: RaspberryProvider) {
    this.dispositivo = navParams.data.dispositivo;
    this.status = navParams.data.statusR;
    this.status.uptime = this.status.uptime.split("up ")[1];
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusBotonPage');
  }

}
