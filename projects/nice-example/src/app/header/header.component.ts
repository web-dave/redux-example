import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { PersonalState } from '../personal/store/personal.state';
import { AddressState } from '../address/store/address.state';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  store = inject(Store);
  personalGroupIsValid$ = this.store.select(PersonalState.selectIsValid);
  addressGroupIsValid$ = this.store.select(AddressState.selectIsValid);
}
