import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from 'src/app/modelos/usuario.model';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private _http: HttpClient,
    private _router: Router) { }
  registrarProyecto(body: any) {
    return this._http.post(`api/registrar_proyecto`, body).pipe(
      tap(res=>{
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

  enviarSolicitud(folio:string){
    return this._http.put(`api/enviar_solicitud/${folio}`,{enviando:true});
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

  agregarIntegrante(folio: string, num_control: string) {
    return this._http.post(`api/agregar_integrante/${folio}`, { num_control: num_control });
  }
  
  eliminarIntegrante(folio: string, num_control: string) {
    return this._http.delete(`api/eliminar_integrante/${folio}`, {
      params: new HttpParams().set('num_control', num_control)
    });
  }
}
