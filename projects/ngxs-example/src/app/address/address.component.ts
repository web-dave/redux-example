import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StepComponent } from '../step/step.component';
import { IAddress } from 'models/address.interface';
import { Subject, takeUntil, map, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StepComponent],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
  title = 'Address';
  // private store = inject(Store<AppState>);
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
    // this.store
    //   .select(selectPersonalGroupIsValid)
    //   .pipe(
    //     tap((data) => console.log(data)),
    //     filter((data) => {
    //       if (!data) {
    //         this.store.dispatch(navigate({ payload: 'PREV', step: Step.two }));
    //       }
    //       return data;
    //     }),
    //     switchMap(() =>
    //       this.store.select(selectAddressGroupData).pipe(take(1))
    //     ),
    //     takeUntil(this.kill$)
    //   )
    //   .subscribe((address: IAddress) =>
    //     this.addressForm.patchValue(address, { emitEvent: false })
    //   );

    this.addressForm.valueChanges
      .pipe(takeUntil(this.kill$))
      .subscribe((payload: Partial<IAddress>) => {
        // this.store.dispatch(patch({ payload }));
      });

    this.addressForm.statusChanges
      .pipe(
        map((status) => status === 'VALID'),
        distinctUntilChanged(),
        takeUntil(this.kill$)
      )
      .subscribe((isValid: boolean) => {
        // this.store.dispatch(changeValidationStatus({ isValid }))
      });
  }

  goToNextStep() {
    if (this.addressForm.invalid) {
      this.submitted = true;
      return;
    }

    // this.store.dispatch(navigate({ payload: 'NEXT', step: Step.two }));
  }

  goToPreviousStep() {
    // this.store.dispatch(navigate({ payload: 'PREV', step: Step.two }));
  }

  ngOnDestroy(): void {
    this.kill$.next();
    this.kill$.complete();
  }
}
