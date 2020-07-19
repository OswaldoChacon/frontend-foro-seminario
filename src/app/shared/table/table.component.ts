import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialogComponent } from 'src/app/dialogs/usuario/usuario.dialog.component';
import { ComponentType } from '@angular/cdk/portal';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() dataSource;
  @Input() columnsHeader;
  @Input() componentDialog: ComponentType<any>;
  @Output() emitData = new EventEmitter();
  // componentDialog : ComponentType<any> = UsuarioDialogComponent;
  objectKeys = Object.keys;
  constructor(
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  
  agregarRegistro(){
    const dialogRef = this._dialog.open(this.componentDialog);
    dialogRef.afterClosed().subscribe(res=>{
      console.log(res);
      // this.resultado.emit(res);
    });
  }
  editarRegistro(registro:any){
    const dialogRef = this._dialog.open(this.componentDialog,{
      data: registro
    });
    dialogRef.afterClosed().subscribe(res=>this.emitData.emit(res));
  }

  emitirData(data:any, opcion?:any, valorOpcion?:string){
    this.emitData.emit({data,opcion,valorOpcion});

  }


}
