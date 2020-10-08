import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  @Input() url: string;
  @Output() emitData = new EventEmitter();
  @Input() tipoDialog: string = 'MatDialog';
  objectKeys = Object.keys;

  constructor(
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  abrirDialog(registro: any) {
    if (this.componentDialog != undefined) {
      this.editarRegistro(registro);
    }
  }
  agregarRegistro() {
    const dialogRef = this._dialog.open(this.componentDialog, {
      data: this.url != undefined ? { url: this.url } : null
    });
    dialogRef.afterClosed().subscribe(res => {
      this.emitData.emit(res);
    });
  }

  editarRegistro(registro: any) {
    const dialogRef = this._dialog.open(this.componentDialog, {
      data: this.url != undefined ? { data: registro, url: this.url } : registro
    });
    dialogRef.afterClosed().subscribe(res => this.emitData.emit(res));
  }

  emitirData(data: any, opcion?: any, valorOpcion?: any) {
    this.emitData.emit({ data, opcion, valorOpcion });

  }
}
