import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from 'src/app/modelos/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private http: HttpClient) { }
  registrarProyecto(body: any){
    return this.http.post(`api/registrar_proyecto`,body)
  }
  getProyectos(slug: string,pagina: string){
    return this.http.get(`api/proyectos/${slug}`,{
      params: new HttpParams().set('page',pagina)
    });
  }
  participa(folio: string, participa: string){
    return this.http.put(`api/proyecto/${folio}`, {'participa':participa}   
    );
  }
  asignarJurado(folio:string,num_control:string){
    return this.http.post(`api/asignar_jurado/${folio}`,{'num_control':num_control})
  }
  eliminarJurado(folio:string,num_control:string){
    return this.http.delete(`api/eliminar_jurado/${folio}`,{
      params: new HttpParams().set('num_control',num_control)      
    })
  } 
}
