import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Foros } from "src/app/modelos/foro.model";
import { formatDate } from "@angular/common";
import { Fechas } from "src/app/modelos/fechas.model";

@Injectable({
  providedIn: "root",
})
export class ForoService {
  constructor(private http: HttpClient) {}
  getForos(pagina:number,no_foro:number) {
    return this.http.get<Foros[]>(`api/foros`, {
      params: new HttpParams().set("page", pagina.toString())
      .set('no_foro',no_foro.toString())
    });
  }
  getForo(slug: string) {
    return this.http.get<Foros>(`api/obtener_foro/${slug}`);
  }
  guardarForo(foro: Foros) {
    return this.http.post(`api/registrar_foro`, foro);
  }
  eliminarForo(slug: string) {
    return this.http.delete(`api/eliminar_foro/${slug}`);
  }
  actualizarForo(slug: string, foro: Foros) {
    return this.http.put(`api/actualizar_foro/${slug}`, foro);
  }
  activar_desactivar(slug:string, valor:number){
    return this.http.put(`api/activar_foro/${slug}`,{acceso:valor});
  }
  configurarForo(slug: string, foro: Foros) {
    return this.http.put(`api/configurar_foro/${slug}`, foro);
  }
  agregarFechaForo(slug: string, fecha: any) {
    if (fecha["fecha"] != "")
      fecha["fecha"] = formatDate(fecha["fecha"], "yyyy-MM-dd", "en");
    return this.http.post(`/api/agregar_fechaForo/${slug}`, fecha);
  }
  eliminarFechaForo(fecha: Date) {
    return this.http.delete(`/api/eliminar_fechaForo/${fecha}`);
  }

  actualizarFechaForo() {}

  agregarBreak(fecha: Date, receso) {
    return this.http.post(`api/agregar_break/${fecha}`, receso);
  }
  eliminarBreak(fecha: Date, posicion: number) {
    return this.http.delete(`api/eliminar_break/${fecha}`, {
      params: new HttpParams().set("posicion", posicion.toString()),
    });
  }

  foroActual() {
    return this.http.get(`api/foro_actual`);
  }
}
