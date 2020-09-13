import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from 'src/app/modelos/usuario.model';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/modelos/proyecto.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private _http: HttpClient,
    private _router: Router) { }
  registrarProyecto(body: any) {
    return this._http.post(`api/registrar_proyecto`, body).pipe(
      tap(res => {
        this._router.navigate(['home']);
      })
    )
  }

  getProyectos(slug: string, pagina: number, folio: string, filtro: string) {
    return this._http.get(`api/proyectos/${slug}`, {
      params: new HttpParams().set('page', pagina.toString())
        .set('folio', folio)
        .set('filtro', filtro)
    });
  }

  
  participa(folio: string, participa: string) {
    return this._http.put(`api/proyecto/${folio}`, { 'participa': participa }
    );
  }

  asignarJurado(folio: string, num_control: string) {
    return this._http.post(`api/asignar_jurado/${folio}`, { 'num_control': num_control })
  }

  eliminarJurado(folio: string, num_control: string) {
    return this._http.delete(`api/eliminar_jurado/${folio}`, {
      params: new HttpParams().set('num_control', num_control)
    });
  }

  listaAlumnos() {
    return this._http.get<Usuario[]>(`api/lista_alumnos`);
  }

  // agregarIntegrante(folio: string, num_control: string) {
  agregarIntegrante(proyecto: Proyecto, alumno: Usuario) {
    return this._http.post(`api/agregar_integrante/${proyecto.folio}`, { num_control: alumno.num_control }).pipe(
      catchError(error => {
        alumno.myTeam = !alumno.myTeam;
        return throwError(error);
      })
    );
  }

  // eliminarIntegrante(folio: string, num_control: string) {
  eliminarIntegrante(proyecto: Proyecto, alumno: Usuario) {
    return this._http.delete(`api/eliminar_integrante/${proyecto.folio}`, {
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
      tap(()=>{
        proyecto.editar = false;
        proyecto.enviar = false;
        proyecto.enviado = true;
        proyecto.cancelar = true;        
      })
    );
  }

  cancelarSolicitud(proyecto: Proyecto){
    return this._http.put(`api/cancelar_solicitud/${proyecto.folio}`, { enviando: true }).pipe(
      tap(()=>{
        proyecto.editar = true;
        proyecto.enviar = true;
        proyecto.enviado = false;
        proyecto.cancelar = false;      
      })
    );
  }

  actualizarProyecto(proyecto: Proyecto,folio:string){
    return this._http.put(`api/actualizar_proyecto/${folio}`,proyecto);
  }
}
