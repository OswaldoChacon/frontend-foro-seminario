import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Foro } from "src/app/modelos/foro.model";
import { formatDate } from "@angular/common";
import { Fecha } from "src/app/modelos/fecha.model";
import { map, catchError } from 'rxjs/operators';
import { Linea } from 'src/app/modelos/linea.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ForoService {
  constructor(private _http: HttpClient,
    private _route: Router,) { }
  getForos(pagina: number, no_foro: number) {
    return this._http.get<Foro[]>(`api/foros`, {
      params: new HttpParams()
        .set("page", pagina.toString())
        .set("no_foro", no_foro.toString()),
    });
  }

  getForo(slug: string) {
    // return this.http.get<Foros>(`api/obtener_foro/${slug}`);
    return this._http.get<Foro>(`api/foros/${slug}`).pipe(
      catchError((error)=>{
        this._route.navigate(['/Administrador/foros']);
        return throwError(error);
      })
    );
  }
  
  guardarForo(foro: Foro) {
    // return this.http.post(`api/registrar_foro`, foro);
    return this._http.post(`api/foros`, foro);
  }
  
  eliminarForo(slug: string) {
    return this._http.delete(`api/foros/${slug}`);
  }
  
  actualizarForo(slug: string, foro: Foro) {
    return this._http.put(`api/foros/${slug}`, foro);
  }
  
  activar_desactivar(slug: string, valor: number) {
    return this._http.put(`api/activar_foro/${slug}`, { acceso: valor });
  }
  
  configurarForo(slug: string, foro: Foro) {
    return this._http.put(`api/configurar_foro/${slug}`, foro);
  }
  
  getFechaForo() { }

  agregarFechaForo(slug: string, fecha: any) {
    if (fecha["fecha"] != "")
      fecha["fecha"] = formatDate(fecha["fecha"], "yyyy-MM-dd", "en");
    // return this.http.post(`/api/agregar_fechaForo/${slug}`, fecha);
    return this._http.post(`/api/fechaforo`, fecha, {
      params: new HttpParams().set('slug', slug)
    });
  }

  eliminarFechaForo(fecha: Date) {
    // return this.http.delete(`/api/eliminar_fechaForo/${fecha}`);
    return this._http.delete(`/api/fechaforo/${fecha}`);
  }

  actualizarFechaForo(fecha:Date,fechaUpdate:any) { 
    return this._http.put(`/api/fechaforo/${fecha}`,fechaUpdate);
  }

  agregarBreak(fecha: Date, receso) {
    return this._http.post(`api/agregar_break/${fecha}`, receso);
  }

  eliminarBreak(fecha: Date, posicion: number) {
    return this._http.delete(`api/eliminar_break/${fecha}`, {
      params: new HttpParams().set("posicion", posicion.toString()),
    });
  }

  foroActual() {
    return this._http.get<{ foro: Foro, lineas: Linea[], tipos: Linea[], docentes: Usuario[] }>(`api/foro_actual`);
  }

  agregarMaestroTaller(slug:string,usuario: Usuario,valor:boolean){
    return this._http.post(`api/agregar_maestro/${slug}`,{num_control:usuario.num_control,agregar:valor});
  }
}
