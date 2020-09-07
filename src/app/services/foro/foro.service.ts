import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Foros } from "src/app/modelos/foro.model";
import { formatDate } from "@angular/common";
import { Fechas } from "src/app/modelos/fechas.model";
import { map } from 'rxjs/operators';
import { Linea } from 'src/app/modelos/linea.model';
import { Usuario } from 'src/app/modelos/usuario.model';

@Injectable({
  providedIn: "root",
})
export class ForoService {
  constructor(private http: HttpClient) { }
  getForos(pagina: number, no_foro: number) {
    return this.http.get<Foros[]>(`api/foros`, {
      params: new HttpParams()
        .set("page", pagina.toString())
        .set("no_foro", no_foro.toString()),
    });
  }

  getForo(slug: string) {
    // return this.http.get<Foros>(`api/obtener_foro/${slug}`);
    return this.http.get<Foros>(`api/foros/${slug}`);
  }
  
  guardarForo(foro: Foros) {
    // return this.http.post(`api/registrar_foro`, foro);
    return this.http.post(`api/foros`, foro);
  }
  
  eliminarForo(slug: string) {
    return this.http.delete(`api/foros/${slug}`);
  }
  
  actualizarForo(slug: string, foro: Foros) {
    return this.http.put(`api/foros/${slug}`, foro);
  }
  
  activar_desactivar(slug: string, valor: number) {
    return this.http.put(`api/activar_foro/${slug}`, { acceso: valor });
  }
  
  configurarForo(slug: string, foro: Foros) {
    return this.http.put(`api/configurar_foro/${slug}`, foro);
  }
  
  getFechaForo() { }

  agregarFechaForo(slug: string, fecha: any) {
    if (fecha["fecha"] != "")
      fecha["fecha"] = formatDate(fecha["fecha"], "yyyy-MM-dd", "en");
    // return this.http.post(`/api/agregar_fechaForo/${slug}`, fecha);
    return this.http.post(`/api/fechaforo`, fecha, {
      params: new HttpParams().set('slug', slug)
    });
  }

  eliminarFechaForo(fecha: Date) {
    // return this.http.delete(`/api/eliminar_fechaForo/${fecha}`);
    return this.http.delete(`/api/fechaforo/${fecha}`);
  }

  actualizarFechaForo(fecha:Date,fechaUpdate:any) { 
    return this.http.put(`/api/fechaforo/${fecha}`,fechaUpdate);
  }

  agregarBreak(fecha: Date, receso) {
    return this.http.post(`api/agregar_break/${fecha}`, receso);
  }

  eliminarBreak(fecha: Date, posicion: number) {
    return this.http.delete(`api/eliminar_break/${fecha}`, {
      params: new HttpParams().set("posicion", posicion.toString()),
    });
  }

  foroActual() {
    return this.http.get<{ foro: Foros, lineas: Linea[], tipos: Linea[], docentes: Usuario[] }>(`api/foro_actual`);
  }
}
