import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from 'src/app/modelos/usuario.model';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/modelos/proyecto.model';
import { throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormErrorService } from './form-error.service';
import { NotificacionesService } from './notificaciones.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private http: HttpClient,
    private formError: FormErrorService,
    private notificacionesService: NotificacionesService,
    private router: Router) { }

  getProyectos(slug: string, pagina: number, folio: string, filtro: string, jurado: string) {
    return this.http.get(`api/proyectos/${slug}`, {
      params: new HttpParams().set('page', pagina.toString())
        .set('folio', folio)
        .set('filtro', filtro)
        .set('jurado', jurado)
    });
  }

  registrarProyecto(proyecto: FormGroup) {
    return this.http.post(`api/proyectos`, proyecto.value).pipe(
      tap(() => {
        this.notificacionesService.misNotificaciones();
        this.router.navigate(['home']);
      }),
      catchError(error => {
        return this.formError.handleError(error, proyecto);
      })
    );
  }

  actualizarProyecto(proyecto: FormGroup, folio: string) {
    return this.http.put(`api/proyectos/${folio}`, proyecto.value).pipe(
      tap(() => {
        this.notificacionesService.misNotificaciones()
      }),
      catchError(error => {
        return this.formError.handleError(error, proyecto);
      })
    );
  }

  participa(proyecto: Proyecto) {
    return this.http.put(`api/proyecto_participa/${proyecto.folio}`, { participa: proyecto.participa }
    ).pipe(
      catchError(error => {
        proyecto.participa = !proyecto.participa;
        return throwError(error);
      })
    );
  }

  asignarJurado(folio: string, docente: Usuario) {
    return this.http.post(`api/asignar_jurado/${folio}`, { 'num_control': docente.num_control }).pipe(
      catchError(error => {
        docente.jurado = false;
        return throwError(error);
      })
    );
  }

  eliminarJurado(folio: string, docente: Usuario) {
    return this.http.delete(`api/eliminar_jurado/${folio}`, {
      params: new HttpParams().set('num_control', docente.num_control)
    }).pipe(
      catchError(error => {
        docente.jurado = true;
        return throwError(error);
      })
    );
  }



  // agregarIntegrante(folio: string, num_control: string) {
  agregarIntegrante(proyecto: Proyecto, alumno: Usuario) {
    return this.http.post(`api/agregar_integrante`, { num_control: alumno.num_control }).pipe(
      catchError(error => {
        alumno.myTeam = !alumno.myTeam;
        return throwError(error);
      })
    );
  }

  eliminarIntegrante(proyecto: Proyecto, alumno: Usuario) {
    return this.http.delete(`api/eliminar_integrante`, {
      params: new HttpParams().set('num_control', alumno.num_control)
    }).pipe(
      catchError(error => {
        alumno.myTeam = !alumno.myTeam;
        return throwError(error);
      })
    );;
  }

  enviarSolicitud(proyecto: Proyecto) {
    return this.http.put(`api/enviar_solicitud/${proyecto.folio}`, { enviando: true }).pipe(
      tap(() => {
        proyecto.editar = false;
        proyecto.enviar = false;
        proyecto.enviado = true;
        proyecto.cancelar = true;
      })
    );
  }

  cancelarSolicitud(proyecto: Proyecto) {
    return this.http.put(`api/cancelar_solicitud/${proyecto.folio}`, { enviando: false }).pipe(
      tap(() => {
        proyecto.editar = true;
        proyecto.enviar = true;
        proyecto.enviado = false;
        proyecto.cancelar = false;
      })
    );
  }

  misProyectos() {
    return this.http.get<Proyecto[]>('api/mis_proyectos');
  }

  proyectoActual() {
    return this.http.get<Proyecto>(`api/proyecto_actual`);
  }
  permitirCambios(proyecto: Proyecto, cambio: boolean) {
    proyecto.permitir_cambios = cambio;
    return this.http.put(`api/permitir_cambios/${proyecto.folio}`, { cambios: cambio }).pipe(
      catchError(error => {
        proyecto.permitir_cambios = !cambio;
        return throwError(error);
      })
    );
  }

}
