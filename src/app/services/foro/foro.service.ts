import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Foro } from "src/app/modelos/foro.model";
import { formatDate } from "@angular/common";
import { Fecha } from "src/app/modelos/fecha.model";
import { catchError } from 'rxjs/operators';
import { Linea } from 'src/app/modelos/linea.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormErrorService } from '../formerror/form-error.service';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: "root",
})
export class ForoService {
  constructor(private _http: HttpClient,
    private _formError: FormErrorService,
    private _route: Router,) { }
  getForos(pagina: number, no_foro: number) {
    return this._http.get<Foro[]>(`api/foros`, {
      params: new HttpParams()
        .set("page", pagina.toString())
        .set("no_foro", no_foro.toString()),
    });
  }

  getForo(slug: string) {
    return this._http.get<Foro>(`api/foros/${slug}`).pipe(
      catchError((error) => {
        this._route.navigate(['/Administrador/foros']);
        return throwError(error);
      })
    );
  }

  guardarForo(foro: FormGroup) {
    return this._http.post(`api/foros`, foro.value).pipe(
      catchError(error => {
        return this._formError.handleError(error, foro);        
      })
    );
  }

  eliminarForo(slug: string) {
    return this._http.delete(`api/foros/${slug}`);
  }

  actualizarForo(slug: string, foro: FormGroup) {
    return this._http.put(`api/foros/${slug}`, foro.value).pipe(
      catchError(error => {
        return this._formError.handleError(error, foro)
      })
    );
  }

  // activar_desactivar(slug: string, valor: number) {
  activar_desactivar(foro: Foro, valor: number) {
    foro.activo = !foro.activo;
    return this._http.put(`api/activar_foro/${foro.slug}`, { activo: valor }).pipe(
      catchError(error=>{
        foro.activo = !foro.activo;
        return throwError(error);
      })
    );
  }

  configurarForo(slug: string, foro: FormGroup) {
    return this._http.put(`api/configurar_foro/${slug}`, foro.value).pipe(
      catchError(error => {
        return this._formError.handleError(error, foro)
      })
    );;
  }

  getFechaForo() { }

  guardarFechaForo(slug: string, fecha: FormGroup) {
    // if (fecha.["fecha"] != "")
    //   fecha["fecha"] = formatDate(fecha["fecha"], "yyyy-MM-dd", "en");
    return this._http.post(`/api/fechaforo`, fecha.value, {
      params: new HttpParams().set('slug', slug)
    }).pipe(
      catchError(error=>{
        return this._formError.handleError(error,fecha)
        return throwError(error)
      })
    );
  }

  actualizarFechaForo(fecha: Date, fechaUpdate: any) {
    return this._http.put(`/api/fechaforo/${fecha}`, fechaUpdate);
  }
  
  eliminarFechaForo(fecha: Date) {
    return this._http.delete(`/api/fechaforo/${fecha}`);
  }  

  agregarBreak(fecha: Date, intervalo: Fecha['intervalos']) {
    intervalo.break = !intervalo.break;
    return this._http.post(`api/agregar_break/${fecha}`, {
      hora: intervalo.hora,
      posicion: intervalo.posicion,
    }).pipe(
      catchError(error => {
        intervalo.break = !intervalo.break;
        return throwError(error)
      })
    );
  }

  eliminarBreak(fecha: Date, intervalo: Fecha['intervalos']) {
    intervalo.break = !intervalo.break;
    return this._http.delete(`api/eliminar_break/${fecha}`, {
      params: new HttpParams().set("posicion", intervalo.posicion.toString()),
    }).pipe(
      catchError(() => {
        intervalo.break = !intervalo.break;
        return of([]);
      })
    )
  }

  foroActual() {
    return this._http.get<{ foro: Foro, lineas: Linea[], tipos: Linea[], docentes: Usuario[] }>(`api/foro_actual`);
  }

  agregarMaestroTaller(slug: string, usuario: Usuario, valor: boolean) {
    usuario.taller = !usuario.taller;
    return this._http.post(`api/agregar_maestro/${slug}`, { num_control: usuario.num_control, agregar: valor }).pipe(
      catchError(error => {
        usuario.taller = !usuario.taller;
        return throwError(error);
      })
    );
  }
}
