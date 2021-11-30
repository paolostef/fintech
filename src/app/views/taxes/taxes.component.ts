import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { codiceFiscaleValidator } from 'src/app/shared/validators/codice-fiscale.validator';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss'],
})
export class TaxesComponent implements OnInit {


  /*
Un ulteriore FormGroup chiamato “contribuente“, che include i campi della sezione “contribuente“: codiceFiscale, cognome, nome, dataDiNascita, sesso, provinciaDiNascita, comuneDiNascita.
Un FormArray chiamato erario.
Un FormArray chiamato inps.

Per la sezione erario avrai i campi codiceTributo, anno, debito, credito.
Per la sezione inps avrai i campi codiceSede, causaleContributo, codiceInps, da, a, debito, credito.
*/
  form = this.fb.group({
    contribuente: this.fb.group({
      codiceFiscale: ['', [Validators.required, codiceFiscaleValidator]],
      cognome: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      dataDiNascita: ['', [Validators.required]],
      sesso: ['', [Validators.required]],
      provinciaDiNascita: ['', [Validators.required, Validators.maxLength(2)]],
      comuneDiNascita: ['', [Validators.required]],
    }),
    erario: this.fb.array([]),
  });

  minYear = 2000;
  maxYear = new Date().getFullYear();


  get erario() {
    return this.form.get('erario') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    // if (this.form.valid) {
    console.log('submit', this.form.value);
    //}
  }

  addErario() {
    this.erario.push(
      this.fb.group({
        codiceTributo: ['', [Validators.required]],
        anno: [null, [Validators.required, Validators.min(this.minYear), Validators.max(this.maxYear)]],
        debito: [null, [Validators.required]],
        credito: [null, [Validators.required]],
      })
    );
  }

  removeErario(i: number) {
    this.erario.removeAt(i);
  }
}
