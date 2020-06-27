import { Component, OnInit, ViewChild } from '@angular/core';
import { HorarioJuradoService } from 'src/app/services/horario/horario-jurado.service';
import { JuradoDataSource } from 'src/app/services/table/jurado.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { JuradoDialogComponent } from 'src/app/dialogs/horario/jurado/jurado.dialog.component';

@Component({
  selector: 'app-horario-jurado',
  templateUrl: './horario-jurado.component.html',
  styleUrls: ['./horario-jurado.component.css']
})
export class HorarioJuradoComponent implements OnInit {

  constructor(private juradoService: HorarioJuradoService,
    private dialog: MatDialog) { }
  dataSource:JuradoDataSource;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  columnas = ['num_control','nombre','acciones'];  
  ngOnInit(): void {
    // this.juradoService.getJuraro().subscribe();
    this.dataSource = new JuradoDataSource(this.juradoService);
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
  abrirDialog(){
    const dialogRef = this.dialog.open(JuradoDialogComponent,{
      data: {}
    })
  }
}
