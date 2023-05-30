import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // store = inject(Store<AppState>);
  personalGroupIsValid$ = of(true); // this.store.select(selectPersonalGroupIsValid);
  addressGroupIsValid$ = of(true); // this.store.select(selectAddressGroupIsValid);
}
