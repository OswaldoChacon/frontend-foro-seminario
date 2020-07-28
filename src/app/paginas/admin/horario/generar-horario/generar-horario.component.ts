import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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
    evaporacion: new FormControl('0.1', [Validators.required]),
    t_minDenominador: new FormControl('10', [Validators.required]),

    iteraciones: new FormControl('', [Validators.required]),
    hormigas: new FormControl('', [Validators.required]),
    estancado: new FormControl('', [Validators.required]),
  });

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }


  generarHorario(){
    
  }
}
