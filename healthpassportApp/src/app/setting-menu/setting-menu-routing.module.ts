import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingMenuPage } from './setting-menu.page';

const routes: Routes = [
  {
    path: '',
    component: SettingMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingMenuPageRoutingModule {}
