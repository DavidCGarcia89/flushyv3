import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeout'
import { RespuestaRaspberry, StatusRaspberry } from '../../model';

/*
  Generated class for the RaspberryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RaspberryProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RaspberryProvider Provider');
  }

  checkConexionRaspberry(ip, puerto) {
    const es_numero = new RegExp("^[0-9]+$");
    if (es_numero.test(puerto)) {
        const uri = 'http://' + ip + ":" + puerto + "/";
        return this.http.get<RespuestaRaspberry>(uri).timeout(5000);
    } else {
        const uri = 'http://' + ip + "/";
        return this.http.get<RespuestaRaspberry>(uri).timeout(5000);
    }
  }
  checkPinRaspberry(ip, puerto, pin) {
    const es_numero = new RegExp("^[0-9]+$");
    if (es_numero.test(puerto)) {
        const uri = 'http://' + ip + ":"  +puerto + "/checkPin?pin=" + pin;
        return this.http.get<RespuestaRaspberry>(uri).timeout(10000);
    } else {
        const uri = 'http://' + ip + "/checkPin?pin=" + pin;
        return this.http.get<RespuestaRaspberry>(uri).timeout(10000);
    }
  }
  checkServoRaspberry(ip, puerto, pin, durIni, durFin, angIni, angFin) {
    const es_numero = new RegExp("^[0-9]+$");
    if (es_numero.test(puerto)) {
        const uri = 'http://' + ip + ":" + puerto + "/checkServo?pin=" + pin + "&durIni=" + durIni + "&durFin=" + durFin + "&angIni=" + angIni + "&angFin=" + angFin;
        return this.http.get<RespuestaRaspberry>(uri).timeout(20000);
    } else {
        const uri = 'http://' + ip +"/checkServo?pin=" + pin + "&durIni=" + durIni + "&durFin=" + durFin + "&angIni=" + angIni + "&angFin=" + angFin;
        return this.http.get<RespuestaRaspberry>(uri).timeout(20000);
    }
  }
  checkStatusRaspberry(ip, puerto) {
    const es_numero = new RegExp("^[0-9]+$");
    if (es_numero.test(puerto)) {
        const uri = 'http://' + ip + ":" + puerto + "/checkStatus";
        return this.http.get<StatusRaspberry>(uri).timeout(5000);
    } else {
        const uri = 'http://' + ip + "/checkStatus";
        return this.http.get<StatusRaspberry>(uri).timeout(5000);
    }
  }

}
