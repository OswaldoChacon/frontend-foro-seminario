import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Foro } from "src/app/modelos/foro.model";
import { Fecha } from "src/app/modelos/fecha.model";
import { catchError } from 'rxjs/operators';
import { Usuario } from 'src/app/modelos/usuario.model';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormErrorService } from './form-error.service';
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
        this._route.navigate(['/administrador/foros']);
        return throwError(error);
      })
    );
  }

  guardarForo(form: FormGroup) {
    return this._http.post(`api/foros`, form.value).pipe(
      catchError(error => {
        return this._formError.handleError(error, form);
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

  activar_desactivar(foro: Foro, valor: number) {
    foro.activo = !foro.activo;
    return this._http.put(`api/activar_foro/${foro.slug}`, { activo: valor }).pipe(
      catchError(error => {
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

  guardarFechaForo(slug: string, form: FormGroup) {    
    return this._http.post(`/api/fechaforo`, form.value, {
      params: new HttpParams().set('slug', slug)
    }).pipe(
      catchError(error => {
        return this._formError.handleError(error, form)
      })
    );
  }

  actualizarFechaForo(fecha: Date, form: FormGroup) {
    return this._http.put(`/api/fechaforo/${fecha}`, form.value).pipe(
      catchError(error => {
        return this._formError.handleError(error, form);
      })
    );
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
    return this._http.get<Foro>(`api/foro_actual`);
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

  generarHorario(form: FormGroup) {
    return this._http.post('api/generar_horario',form.value).pipe(
      catchError(error => {
        return this._formError.handleError(error, form);
      })
    );
  }
  
  getProyectosJurado(){
    return this._http.get('api/proyectos_maestros');
  }
}
