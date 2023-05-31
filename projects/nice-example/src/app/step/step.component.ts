import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { StepState } from './store/step.state';
import { Step } from 'models/steps.interface';
import { Observable, tap } from 'rxjs';
import { AddressState } from '../address/store/address.state';
import { PersonalState } from '../personal/store/personal.state';
import { SkillState } from '../skills/store/skill.state';
import { StepActions } from './store/step.actions';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step.component.html',
})
export class StepComponent {
  Step = Step;
  store = inject(Store);
  step: Step = Step.one;

  step$: Observable<Step> = this.store
    .select(StepState.selectStep)
    .pipe(tap((data) => (this.step = data)));

  personalGroupIsValid$ = this.store.select(PersonalState.selectIsValid);

  addressGroupIsValid$ = this.store.select(AddressState.selectIsValid);

  skillGroupIsValid$ = this.store.select(SkillState.selectIsValid);

  goToPreviousStep() {
    this.store.dispatch(new StepActions.navigate('PREV', this.step));
  }

  goToNextStep() {
    this.store.dispatch(new StepActions.navigate('NEXT', this.step));
  }
}
