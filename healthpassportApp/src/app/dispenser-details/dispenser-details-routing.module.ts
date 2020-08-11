import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispenserDetailsPage } from './dispenser-details.page';

const routes: Routes = [
  {
    path: '',
    component: DispenserDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispenserDetailsPageRoutingModule {}
