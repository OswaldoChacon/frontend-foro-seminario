import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioJuradoService {

  constructor(private http: HttpClient) { }

  getJurado(pagina: string,filtro:string){
    return this.http.get(`api/jurado`,{
      params: new HttpParams()
      .set('page',pagina)
      .set('filtro',filtro)
    });
  }
  
  // agregarHorario(num_control:string,fecha:Date,hora:string,posicion:number){
  agregarHorario(num_control:string,fecha:Date,intervalo: any){
    return this.http.post(`api/agregar_horarioJurado/${num_control}`,{fecha:fecha,posicion:intervalo.posicion,hora:intervalo.hora}).pipe(
      catchError((error)=>{
        intervalo.selected = false;
        return throwError(error)
      })
    );
  }
  
  agregarHorarioAll(num_control:string,fecha:any){    
    return this.http.post(`api/agregar_horarioJurado_all/${num_control}`,{fecha:fecha}).pipe(
      catchError((error)=>{
        fecha.checked= false;
        return throwError(error);
      })
    );
  }
  
  eliminarHorarioAll(num_control:string, fecha:any){
    return this.http.delete(`api/eliminar_horarioJurado_all/${num_control}`,{
      params: new HttpParams().set('fecha',fecha.fecha)
    }).pipe(
      catchError((error)=>{
        fecha.checked= true;
        return throwError(error);
      })
    );    
  }
  
  eliminarHorario(num_control:string, fecha:Date,intervalo:any){
    return this.http.delete(`api/eliminar_horarioJurado/${num_control}`,{
      params: new HttpParams().set('fecha',fecha.toString())
      .set('posicion',intervalo.posicion.toString())
    }).pipe(
      catchError((error) => {
        intervalo.selected = true;
        return throwError(error)
      })
    );
  }

}
