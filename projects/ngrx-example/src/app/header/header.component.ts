import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  personalGroupIsValid$ = true; // this.store.select(fromRoot.selectPersonalGroupIsValid);
  addressGroupIsValid$ = true; // this.store.select(fromRoot.selectAddressGroupIsValid);

  // constructor(private store: Store<fromRoot.State>) {}
}
