import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from 'src/app/modelos/usuario.model';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/modelos/proyecto.model';
import { throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormErrorService } from '../formerror/form-error.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private _http: HttpClient,
    private _formError: FormErrorService,
    private _router: Router) { }

  getProyectos(slug: string, pagina: number, folio: string, filtro: string) {
    return this._http.get(`api/proyectos/${slug}`, {
      params: new HttpParams().set('page', pagina.toString())
        .set('folio', folio)
        .set('filtro', filtro)
    });
  }

  registrarProyecto(proyecto: FormGroup) {
    return this._http.post(`api/registrar_proyecto`, proyecto.value).pipe(
      tap(res => {
        this._router.navigate(['home']);
      }),
      catchError(error => {
        return this._formError.handleError(error, proyecto);
      })
    );
  }

  actualizarProyecto(proyecto: FormGroup, folio: string) {
    return this._http.put(`api/actualizar_proyecto/${folio}`, proyecto.value).pipe(
      catchError(error => {
        return this._formError.handleError(error, proyecto);
      })
    );
  }

  participa(folio: string, participa: string) {
    return this._http.put(`api/proyecto/${folio}`, { 'participa': participa }
    );
  }

  asignarJurado(folio: string, docente: Usuario) {
    return this._http.post(`api/asignar_jurado/${folio}`, { 'num_control': docente.num_control }).pipe(
      catchError(error => {
        docente.jurado = false;
        return throwError(error);
      })
    );
  }

  eliminarJurado(folio: string, docente: Usuario) {
    return this._http.delete(`api/eliminar_jurado/${folio}`, {
      params: new HttpParams().set('num_control', docente.num_control)
    }).pipe(
      catchError(error => {
        docente.jurado = true;
        return throwError(error);
      })
    );
  }

// tal vez no deberia estar aqui
  listaAlumnos() {
    return this._http.get<Usuario[]>(`api/lista_alumnos`);
  }

  // agregarIntegrante(folio: string, num_control: string) {
  agregarIntegrante(proyecto: Proyecto, alumno: Usuario) {
    return this._http.post(`api/agregar_integrante`, { num_control: alumno.num_control }).pipe(
      catchError(error => {
        alumno.myTeam = !alumno.myTeam;
        return throwError(error);
      })
    );
  }

  // eliminarIntegrante(folio: string, num_control: string) {
  eliminarIntegrante(proyecto: Proyecto, alumno: Usuario) {
    return this._http.delete(`api/eliminar_integrante`, {
      params: new HttpParams().set('num_control', alumno.num_control)
    }).pipe(
      catchError(error => {
        alumno.myTeam = !alumno.myTeam;
        return throwError(error);
      })
    );;
  }

  enviarSolicitud(proyecto: Proyecto) {
    return this._http.put(`api/enviar_solicitud/${proyecto.folio}`, { enviando: true }).pipe(
      tap(() => {
        proyecto.editar = false;
        proyecto.enviar = false;
        proyecto.enviado = true;
        proyecto.cancelar = true;
      })
    );
  }

  cancelarSolicitud(proyecto: Proyecto) {
    return this._http.put(`api/cancelar_solicitud/${proyecto.folio}`, { enviando: true }).pipe(
      tap(() => {
        proyecto.editar = true;
        proyecto.enviar = true;
        proyecto.enviado = false;
        proyecto.cancelar = false;
      })
    );
  }

  misProyectos(){
    // const rolActual = this._router.url.includes("Administrador") ? "Administrador" : this._router.url.includes("Alumno") ? "Alumno" : "Docente";
    return this._http.get<Proyecto[]>('api/mis_proyectos');
  }

  permitirCambios(proyecto: Proyecto, cambio: boolean){
    proyecto.permitir_cambios = cambio;
    return this._http.put(`api/permitir_cambios/${proyecto.folio}`,{cambios:cambio}).pipe(
      catchError(error=>{
        proyecto.permitir_cambios = !cambio;
        return throwError(error);
      })
    );
  }

}
