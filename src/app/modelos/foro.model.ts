// import { Fechas } from '../paginas/admin/foros/foros.component';

export class Foro{    
  slug: string;
  no_foro: number;
  nombre: string;
  periodo: string;
  anio: number;
  lim_alumnos?: number;
  num_aulas?: number;
  num_maestros?: number;
  duracion?: number;
  activo?: number|boolean;
  fecha_limite: Date;
  prefijo?: string;
  user_id?: number;
  fechas?: [];
  docentes?:[]

}