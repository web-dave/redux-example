import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  AppState,
  selectAddressGroupIsValid,
  selectPersonalGroupIsValid,
} from '../store/app.state';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  store = inject(Store<AppState>);
  personalGroupIsValid$ = this.store.select(selectPersonalGroupIsValid);
  addressGroupIsValid$ = this.store.select(selectAddressGroupIsValid);
}
