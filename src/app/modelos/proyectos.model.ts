import { Usuario } from './usuario.model';

export class Proyectos {
  folio: string;
  titulo: string;
  empresa?: string;
  objetivo?: string;
  asesor?: number;
  tipos_proyectos: {nombre:string};
  lineadeinvestigacion: {nombre:string};
  // asesora:{
  //   num_control:string;
  //   nombreCompleto:string;
  // }
  asesora: Usuario
  participa?: number;
  aceptado?: number;
  cancelado?: number;
  calificacion_foro?: number;
  calificacion_seminario?: number;
  promedio?: number;
  jurado? : any;
}