import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Validators,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map, merge, distinctUntilChanged, filter } from 'rxjs';
import { AppState, selectPersonalGroupData } from '../app.store';
import { IPersonal } from '../models/personal.interface';
import { changeValidationStatus, patch } from './store/personal.actions';
import { StepComponent } from '../step/step.component';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StepComponent],
  templateUrl: './personal.component.html',
})
export class PersonalComponent {
  title = 'Personal';
  firstNameCtrl = new FormControl('', [Validators.required]);
  lastNameCtrl = new FormControl('', [Validators.required]);
  ageCtrl = new FormControl(0, [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  aboutCtrl = new FormControl('', [Validators.required]);
  personalForm = new FormGroup(
    {
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      age: this.ageCtrl,
      about: this.aboutCtrl,
    },
    { updateOn: 'blur' }
  );
  submitted = false;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .select(selectPersonalGroupData)
      .pipe(take(1))
      .subscribe((personal: IPersonal) =>
        this.personalForm.patchValue(personal, { emitEvent: false })
      );

    const firstName$ = this.firstNameCtrl.valueChanges.pipe(
      filter((data): data is string => !!data),
      map((firstName: string) => ({ firstName } as Partial<IPersonal>))
    );
    const lastName$ = this.lastNameCtrl.valueChanges.pipe(
      filter((data): data is string => !!data),
      map((lastName: string) => ({ lastName } as Partial<IPersonal>))
    );
    const age$ = this.ageCtrl.valueChanges.pipe(
      filter((data): data is number => !!data),
      map((age: number) => ({ age } as Partial<IPersonal>))
    );
    const about$ = this.aboutCtrl.valueChanges.pipe(
      filter((data): data is string => !!data),
      map((about: string) => ({ about } as Partial<IPersonal>))
    );

    merge(firstName$, lastName$, age$, about$).subscribe(
      (payload: Partial<IPersonal>) => {
        this.store.dispatch(patch({ payload }));
      }
    );

    this.personalForm.valueChanges
      .pipe(
        map(() => this.personalForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(changeValidationStatus({ isValid }))
      );
  }

  goToNextStep() {
    if (this.personalForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['address']);
  }
}
