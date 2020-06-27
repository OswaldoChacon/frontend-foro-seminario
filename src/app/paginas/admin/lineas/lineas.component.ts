import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Linea } from 'src/app/modelos/linea.model';

import { LineaService } from 'src/app/services/lineas/lineas.service';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LineaDialogComponent } from 'src/app/dialogs/linea/linea.dialog.component';
import { LineaDataSource } from 'src/app/services/table/lineas.datasource';


@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.css']
})
export class LineasComponent implements OnInit {
  columnasTabla = ['clave', 'nombre','acciones'];    
  dataSource: LineaDataSource = null;  
  constructor(          
              private LineaService: LineaService,
              private dialogLinea: MatDialog) {}
  
  ngOnInit() {   
    this.dataSource = new LineaDataSource(this.LineaService);    
    this.dataSource.cargarLineas();                     
  }
 
  abrirDialog()
  {
    let dialogRef = this.dialogLinea.open(LineaDialogComponent);
    dialogRef.afterClosed().subscribe(
      result=>{                      
        if(result != 1)
            this.dataSource.cargarLineas();        
      }
    );    
  }
  editarLinea(linea: Linea){    
    let dialogRef = this.dialogLinea.open(LineaDialogComponent, {data:linea});
    dialogRef.afterClosed().subscribe(result=>{
      if(result != 1)
        this.dataSource.cargarLineas();                        
    });
  }
  

  eliminarLinea(linea: Linea)
  {    
    this.dataSource.resetData();
    this.LineaService.eliminarLinea(linea.clave).subscribe(()=>this.dataSource.cargarLineas());
    // this.dataSource.eliminarLinea();
  }
}
