import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RespuestaRaspberry } from 'model';

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

  peticionRaspberry(ip, puerto, pin) {
    const es_numero = new RegExp("^[0-9]+$");
    if (es_numero.test(puerto) && es_numero.test(pin)) {
      const uri = 'http://' + ip +":"+puerto+"/raspberry?pin="+pin;
      return this.http.get<RespuestaRaspberry>(uri);
    } else {
      const uri = 'http://' + ip +"/raspberry?pin="+pin;
      return this.http.get<RespuestaRaspberry>(uri);
    }
  }

}
