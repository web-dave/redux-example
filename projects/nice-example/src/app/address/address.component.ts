import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StepComponent } from '../step/step.component';
import { IAddress } from 'models/address.interface';
import {
  Subject,
  takeUntil,
  map,
  distinctUntilChanged,
  filter,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Store } from '@ngxs/store';
import { AddressActions } from './store/address.actions';
import { StepActions } from '../step/store/step.actions';
import { Step } from 'models/steps.interface';
import { navigate } from 'projects/ngrx-example/src/app/step/store/step.actions';
import { AddressState } from './store/address.state';
import { PersonalState } from '../personal/store/personal.state';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StepComponent],
  templateUrl: './address.component.html',
  styles: [
    `
      :host {
        display: block;
        /* margin-bottom: 35px; */
      }
      h2 {
        color: var(--header-clr);
        text-align: center;
        text-transform: uppercase;
        margin-bottom: 20px;
      }
    `,
  ],
})
export class AddressComponent {
  title = 'Address';
  private store = inject(Store);
  private fb = inject(NonNullableFormBuilder);
  kill$ = new Subject<void>();

  addressForm = this.fb.group(
    {
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      building: ['', [Validators.required]],
    },
    {
      updateOn: 'blur',
    }
  );
  countryCtrl = this.addressForm.get('country');
  stateCtrl = this.addressForm.get('state');
  cityCtrl = this.addressForm.get('city');
  streetCtrl = this.addressForm.get('street');
  buildingCtrl = this.addressForm.get('building');

  submitted = false;

  ngOnInit() {
    this.store
      .select(PersonalState.selectIsValid)
      .pipe(
        tap((data) => console.log(data)),
        filter((data) => {
          if (!data) {
            this.store.dispatch(navigate({ payload: 'PREV', step: Step.two }));
          }
          return data;
        }),
        switchMap(() =>
          this.store.select(AddressState.selectData).pipe(take(1))
        ),
        takeUntil(this.kill$)
      )
      .subscribe((address: IAddress) =>
        this.addressForm.patchValue(address, { emitEvent: false })
      );

    this.addressForm.valueChanges
      .pipe(takeUntil(this.kill$))
      .subscribe((payload: Partial<IAddress>) => {
        this.store.dispatch(new AddressActions.patch(payload));
      });

    this.addressForm.statusChanges
      .pipe(
        map((status) => status === 'VALID'),
        distinctUntilChanged(),
        takeUntil(this.kill$)
      )
      .subscribe((isValid: boolean) => {
        this.store.dispatch(new AddressActions.changeValidationStatus(isValid));
      });
  }

  goToNextStep() {
    if (this.addressForm.invalid) {
      this.submitted = true;
      return;
    }

    this.store.dispatch(new StepActions.navigate('NEXT', Step.two));
  }

  goToPreviousStep() {
    this.store.dispatch(new StepActions.navigate('PREV', Step.two));
  }

  ngOnDestroy(): void {
    this.kill$.next();
    this.kill$.complete();
  }
}
