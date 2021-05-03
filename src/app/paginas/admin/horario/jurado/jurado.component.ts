import { Component, OnInit, ViewChild } from '@angular/core';
import { HorarioJuradoService } from 'src/app/services/horario-jurado.service';
import { JuradoDataSource } from 'src/app/services/table/jurado.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { HorarioJuradoDialogComponent } from '../../dialogs/horario-jurado/horario-jurado.dialog.component';

@Component({
  selector: 'app-jurado',
  templateUrl: './jurado.component.html',
  styleUrls: ['./jurado.component.css']
})
export class JuradoComponent implements OnInit {

  dataSource: JuradoDataSource;
  columnsHeader = { 'num_control': 'No. Control', 'nombreCompleto': 'Nombre completo','horarios_count':'Cantidad de horarios','jurado_proyecto_count':'Cantidad de proyectos' };
  componentDialog = HorarioJuradoDialogComponent;  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  opciones = ['Todos', 'Asignados', 'Pendientes'];
  filtroElegido: string = ''

  constructor(private _juradoService: HorarioJuradoService) { }
  ngOnInit(): void {
    this.dataSource = new JuradoDataSource(this._juradoService);
    this.getJurado();
  }
  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => {
        this.dataSource.resetData();
        this.dataSource.getJurado((this.paginator.pageIndex + 1).toString(), this.filtroElegido);
      })
    ).subscribe();
  }

  getJurado() {
    this.paginator.pageIndex = 0;
    this.dataSource.getJurado("1", this.filtroElegido);
  }

  cargarTable(event: { data?: any, opcion?: any, valorOpcion?: string }) {

  }

}
