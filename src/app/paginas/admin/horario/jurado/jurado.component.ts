import { Component, OnInit, ViewChild } from '@angular/core';
import { HorarioJuradoService } from 'src/app/services/horario/horario-jurado.service';
import { JuradoDataSource } from 'src/app/services/table/jurado.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { HorarioJuradoSheetComponent } from '../../bottomsheets/horario-jurado/horario-jurado.sheet.component';
import { HorarioJuradoDialogComponent } from '../../dialogs/horario-jurado/horario-jurado.dialog.component';

@Component({
  selector: 'app-jurado',
  templateUrl: './jurado.component.html',
  styleUrls: ['./jurado.component.css']
})
export class JuradoComponent implements OnInit {

  dataSource: JuradoDataSource;
  columnsHeader = { 'num_control': 'No. Control', 'nombreCompleto': 'Nombre completo' };
  componentDialog = HorarioJuradoDialogComponent;
  // componentDialog = HorarioJuradoSheetComponent;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  opciones = ['Todos', 'Asignados', 'Pendientes'];
  filtroElegido: string = ''

  constructor(private _juradoService: HorarioJuradoService) { }
  ngOnInit(): void {
    // this.juradoService.getJuraro().subscribe();
    this.dataSource = new JuradoDataSource(this._juradoService);
    // this.dataSource.getJurado("1");
    this.getJurado();
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.paginator.page.pipe(
      tap(() => {
        this.dataSource.resetData();
        this.dataSource.getJurado((this.paginator.pageIndex + 1).toString(),this.filtroElegido);
      })
    ).subscribe();
  }

  getJurado() {
    this.dataSource.getJurado("1",this.filtroElegido);
  }

  cargarTable(event: { data?: any, opcion?: any, valorOpcion?: string }) {

  }

}
