import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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
  
  agregarHorario(num_control:string,fecha:Date,hora:string,posicion:number){
    return this.http.post(`api/agregar_horarioJurado/${num_control}`,{fecha:fecha,posicion:posicion,hora:hora});
  }
  
  agregarHorarioAll(num_control:string,horario:any){    
    return this.http.post(`api/agregar_horarioJurado_all/${num_control}`,{fecha:horario});
  }
  
  eliminarHorarioAll(num_control:string, horario:any){
    return this.http.delete(`api/eliminar_horarioJurado_all/${num_control}`,{
      params: new HttpParams().set('fecha',horario.fecha)
    })
    // {fecha:horario});
  }
  
  eliminarHorario(num_control:string, fecha:Date,posicion:number){
    return this.http.delete(`api/eliminar_horarioJurado/${num_control}`,{
      params: new HttpParams().set('fecha',fecha.toString())
      .set('posicion',posicion.toString())
    });
  }

}
