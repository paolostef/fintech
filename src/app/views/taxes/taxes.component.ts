import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, from, Observable, of } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { TaxesService } from 'src/app/api/taxes.service';
import { codiceFiscaleValidator } from 'src/app/shared/validators/codice-fiscale.validator';
import { inpsValidator } from 'src/app/shared/validators/inps.validator';
import { INPSErrorStateMatcher } from './utility/inps-error-state-mather.utils';

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
      dataDiNascita: [null, [Validators.required]],
      sesso: ['', [Validators.required]],
      provinciaDiNascita: ['', [Validators.required, Validators.maxLength(2)]],
      comuneDiNascita: ['', [Validators.required]],
    }),
    erario: this.fb.array([]),
    inps: this.fb.array([]),
  });

  get erario() {
    return this.form.get('erario') as FormArray;
  }
  get inps() {
    return this.form.get('inps') as FormArray;
  }

  minYear = 2000;
  maxYear = new Date().getFullYear();

  totaliErario$: Observable<Totals>;
  totaliInps$: Observable<Totals>;
  totale$: Observable<number>;

  inpsMatcher = new INPSErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private taxesService: TaxesService
  ) {
    this.form.valueChanges.subscribe((val) => console.log(val));

    this.totaliErario$ = this.form.valueChanges.pipe(
      startWith({}),
      map((val) => this.getTotals(val.erario))
    );

    this.totaliInps$ = this.form.valueChanges.pipe(
      startWith({}),
      map((val) => this.getTotals(val.inps))
    );

    this.totale$ = combineLatest([this.totaliErario$, this.totaliInps$]).pipe(
      map(
        ([totE, totI]) =>
          totE.credito + totI.credito - totE.debito - totI.debito
      )
    );
  }

  private getTotals(array: any[]): Totals {
    const result = {
      credito: 0,
      debito: 0,
    };
    if (array) {
      array.forEach((el: any) => {
        if (el.credito) {
          result.credito += el.credito;
        }
        if (el.debito) {
          result.debito += el.debito;
        }
      });
    }
    return result;
  }

  ngOnInit(): void {}

  addErario() {
    this.erario.push(
      this.fb.group({
        codiceTributo: ['', [Validators.required]],
        anno: [
          null,
          [
            Validators.required,
            Validators.min(this.minYear),
            Validators.max(this.maxYear),
          ],
        ],
        debito: [null, [Validators.required]],
        credito: [null, [Validators.required]],
      })
    );
  }

  removeErario(i: number) {
    this.erario.removeAt(i);
  }

  addInps() {
    this.inps.push(
      this.fb.group(
        {
          codiceSede: ['', [Validators.required]],
          causaleContributo: ['', [Validators.required]],
          codiceInps: ['', [Validators.required]],
          da: [null, [Validators.required]],
          a: [null, [Validators.required]],
          debito: [null, [Validators.required]],
          credito: [null, [Validators.required]],
        },
        {
          validators: [inpsValidator('da', 'a')],
        }
      )
    );

    this.inps.updateValueAndValidity();
  }

  removeInps(i: number) {
    this.inps.removeAt(i);
  }

  onSubmit() {
    console.log('submit', this.form.value);
    if (this.form.valid) {
      this.taxesService.taxes(this.form.value).subscribe({
        next: (ok) => {
          if (ok) {
            this.snackBar.open('Modello F24 inviato con successo!', 'Ok');
          } else {
            this.snackBar.open("Errore nell'invio del modello F24", 'KO');
          }
        },
        error: console.error,
      });
    }
  }
}

interface Totals {
  debito: number;
  credito: number;
}
