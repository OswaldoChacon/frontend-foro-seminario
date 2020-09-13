import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { MatBottomSheet } from '@angular/material/bottom-sheet';



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
  // @Input() templateRef: TemplateRef<any>
  objectKeys = Object.keys;

  constructor(
    private _dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
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
    if (this.tipoDialog === 'MatDialog') {
      const dialogRef = this._dialog.open(this.componentDialog, {
        data: this.url != undefined ? { data: registro, url: this.url } : registro
      });
      dialogRef.afterClosed().subscribe(res => this.emitData.emit(res));
    }
    else if (this.tipoDialog === 'BottomSheet') {
// aqui es el bottom sheet
    const bottomSheetRef = this._bottomSheet.open(this.componentDialog,{
      data: this.url != undefined ? { data: registro, url: this.url } : registro
    });
    bottomSheetRef.afterDismissed().subscribe(res=>this.emitData.emit(res));

    }    
  }

  emitirData(data: any, opcion?: any, valorOpcion?: any) {
    this.emitData.emit({ data, opcion, valorOpcion });

  }

}
