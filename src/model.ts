export interface Dispositivo {
    id: string;
    nombre: string;
    ip: string;
    puerto:Number;
    pin: Number;
    icon: string;
    tiempoActivo: Number;
  }

export interface RespuestaRaspberry {
  respuesta: string;
}