import { Component, OnInit, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialogComponent } from 'src/app/dialogs/usuario/usuario.dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() dataSource;
  @Input() columnsHeader;
  @Input() componentDialog: ComponentType<any>;
  @Output() resultado = new EventEmitter();
  // componentDialog : ComponentType<any> = UsuarioDialogComponent;
  objectKeys = Object.keys;
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  
  agregarRegistro(){
    let dialogRef = this.dialog.open(this.componentDialog);
    dialogRef.afterClosed().subscribe(res=>{
      console.log(res);
      // this.resultado.emit(res);
    });
  }


}
