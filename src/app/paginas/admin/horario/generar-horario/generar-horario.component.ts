import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ForoService } from 'src/app/services/foro/foro.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-generar-horario',
  templateUrl: './generar-horario.component.html',
  styleUrls: ['./generar-horario.component.css']
})
export class GenerarHorarioComponent implements OnInit {

  formHorario = this._formBuilder.group({
    alpha: new FormControl('1', [Validators.required]),
    beta: new FormControl('2', [Validators.required]),
    Q: new FormControl('1', [Validators.required]),
    evaporation: new FormControl('0.1', [Validators.required]),
    t_minDenominador: new FormControl('10', [Validators.required]),
    iterations: new FormControl('10', [Validators.required]),
    ants: new FormControl('2', [Validators.required]),
    estancado: new FormControl('4', [Validators.required]),
  });
  horario:any;
  objectKeys = Object.keys
  @ViewChild('table') table: ElementRef;
  constructor(private _formBuilder: FormBuilder,
    private _foroService: ForoService) { }

  ngOnInit(): void {
  }


  generarHorario(){
    this._foroService.generarHorario(this.formHorario).subscribe(horario=>this.horario = horario);
    
  }

  fireEvent() 
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  /* save to file */
  XLSX.writeFile(wb, 'SheetJS.xlsx');
  
}
}
