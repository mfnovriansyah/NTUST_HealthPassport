import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispenserInformationPage } from './dispenser-information.page';

const routes: Routes = [
  {
    path: '',
    component: DispenserInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispenserInformationPageRoutingModule {}
