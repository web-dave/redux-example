import { Component, OnInit, inject } from '@angular/core';
import { Actions, ofAction } from '@ngxs/store';
import { StepActions } from './step/store/step.actions';
import { NEVER, Observable, map, merge } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngxs-example';
  action$ = inject(Actions);
  show$ = this.action$.pipe(
    ofAction(StepActions.complete),
    map(() => true)
  );
  hide$ = this.action$.pipe(
    ofAction(StepActions.close),
    map(() => false)
  );
  visible$ = merge(this.show$, this.hide$);
}
