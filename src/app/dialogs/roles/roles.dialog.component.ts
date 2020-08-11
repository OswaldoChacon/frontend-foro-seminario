import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles.dialog.component.html',
  styleUrls: ['./roles.dialog.component.css']
})
export class RolesDialogComponent implements OnInit {

  constructor(
    @Optional() @Inject (MAT_DIALOG_DATA) private data: any,
    private _dialog: MatDialogRef<RolesDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

}
