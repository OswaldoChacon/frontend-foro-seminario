import { Component, OnInit, InjectionToken, Inject, Input, ComponentRef } from '@angular/core';
import { ComponentPortal, CdkPortalOutletAttachedRef } from '@angular/cdk/portal';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-fechas',
  templateUrl: './overview.dialog.component.html',
  styleUrls: ['./overview.dialog.component.css']
})
export class OverviewDialogComponent implements OnInit {
  guardando: boolean ;
  @Input() formCheck : FormGroupDirective;
  test : ComponentRef<any>;
  portal: ComponentPortal<any>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {component?: any, recordValue: any}
  ) { }

  ngOnInit(): void {
    this.portal = new ComponentPortal(this.data.component);
    // this.portal.viewContainerRef.element.nati        
  }
  // formulario(ref: CdkPortalOutletAttachedRef) {
  formulario(ref: CdkPortalOutletAttachedRef) {
    this.test = ref as ComponentRef<any>;
    // ref.instance.for
    // console.log(ref.instance.form);
    this.formCheck = this.test.instance.formUsuario;
    this.test.instance.currentUser = this.data.recordValue;        
    console.log(this.test)
    // console.error(_event, this.formCheck['status'])
  }



}
