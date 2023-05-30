import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'personal',
    loadComponent: () =>
      import('./personal/personal.component').then((m) => m.PersonalComponent),
  },
  {
    path: 'address',
    loadComponent: () =>
      import('./address/address.component').then((m) => m.AddressComponent),
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./skills/skills.component').then((m) => m.SkillsComponent),
  },
  { path: '', redirectTo: 'personal', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
