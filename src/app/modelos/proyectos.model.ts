import { Usuario } from './usuario.model';
import { Linea } from './linea.model';

export class Proyectos {
  folio: string;
  titulo: string;
  empresa?: string;
  objetivo?: string;
  asesor?: number;
  tipos_proyectos: Linea
  lineadeinvestigacion: Linea
  // asesora:{
  //   num_control:string;
  //   nombreCompleto:string;
  // }
  asesora: Usuario;
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
}