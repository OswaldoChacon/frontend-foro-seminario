import { Usuario } from './usuario.model';
import { Linea } from './linea.model';

export class Proyecto {
  folio: string;
  titulo: string;
  empresa?: string;
  objetivo?: string;  
  tipo_de_proyecto: Linea;
  linea_de_investigacion: Linea;  
  // asesora:{
  //   num_control:string;
  //   nombreCompleto:string;
  // }
  asesor: Usuario;
  editar?:boolean;
  participa?: number;
  aceptado?: number;
  cancelado?: number;
  calificacion_foro?: number;
  calificacion_seminario?: number;
  promedio?: number;
  jurado? : any;
  enviado?:boolean;
  enviar?:boolean;
  permitir_cambios?:boolean;
  cancelar?:boolean;
  inTime?:boolean;
}