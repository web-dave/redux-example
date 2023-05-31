import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { PersonalState } from '../personal/store/personal.state';
import { AddressState } from '../address/store/address.state';
import { Step } from 'models/steps.interface';
import { StepState } from '../step/store/step.state';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  store = inject(Store);

  Step = Step;

  @Select(StepState.selectStep)
  step$!: Observable<Step>;

  isActive(step: Step | null, index: number): boolean {
    if (step === null) return false;

    switch (step) {
      case Step.one:
        return index === 0;
      case Step.two:
        return index === 0 || index === 1;
      case Step.three:
        return true;
      default:
        return false;
    }
  }
}
