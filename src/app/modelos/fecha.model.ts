import { Time } from "@angular/common";

export class Fecha {
  fecha: Date;
  //   foros_id: number;
  hora?:string;
  hora_inicio: Time;
  hora_termino: Time;
  intervalos?: {
    hora: string;
    posicion: number;
    break: boolean;
  }
  length?:number;
  // posicion: [];
  // receso: [];
}
