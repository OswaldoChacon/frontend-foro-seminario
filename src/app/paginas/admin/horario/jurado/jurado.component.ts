import { Component, OnInit, ViewChild } from '@angular/core';
import { HorarioJuradoService } from 'src/app/services/horario/horario-jurado.service';
import { JuradoDataSource } from 'src/app/services/table/jurado.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { HorarioJuradoDialogComponent } from 'src/app/dialogs/horario-jurado/horario-jurado.dialog.component';

@Component({
  selector: 'app-jurado',
  templateUrl: './jurado.component.html',
  styleUrls: ['./jurado.component.css']
})
export class JuradoComponent implements OnInit {

  constructor(private _juradoService: HorarioJuradoService) { }
  dataSource:JuradoDataSource;
  columnsHeader = { 'num_control':'No. Control','nombreCompleto':'Nombre completo'};
  componentDialog = HorarioJuradoDialogComponent;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  columnas = ['num_control','nombre','acciones'];  
  ngOnInit(): void {
    // this.juradoService.getJuraro().subscribe();
    this.dataSource = new JuradoDataSource(this._juradoService);
    this.dataSource.cargarJurado("1");
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.paginator.page.pipe(
      tap(() => {
        this.dataSource.resetData();
        this.dataSource.cargarJurado(
          (this.paginator.pageIndex + 1).toString()
        );
      })
    ).subscribe();
  }
  cargarTable(event: { data?: any, opcion?: any, valorOpcion?: string }) {

  }
 
}
