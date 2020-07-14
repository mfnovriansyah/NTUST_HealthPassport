import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentNeedsPage } from './student-needs.page';

const routes: Routes = [
  {
    path: '',
    component: StudentNeedsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentNeedsPageRoutingModule {}
