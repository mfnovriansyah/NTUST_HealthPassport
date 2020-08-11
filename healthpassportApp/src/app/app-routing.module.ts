import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home/:deviceId',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'setting-menu',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'personal-information',
    loadChildren: () => import('./personal-information/personal-information.module').then( m => m.PersonalInformationPageModule)
  },
  {
    path: 'student-needs',
    loadChildren: () => import('./student-needs/student-needs.module').then( m => m.StudentNeedsPageModule)
  },
  {
    path: 'dispenser-information',
    loadChildren: () => import('./dispenser-information/dispenser-information.module').then( m => m.DispenserInformationPageModule)
  },
  {
    path: 'setting-menu',
    loadChildren: () => import('./setting-menu/setting-menu.module').then( m => m.SettingMenuPageModule)
  },  {
    path: 'dispenser-details',
    loadChildren: () => import('./dispenser-details/dispenser-details.module').then( m => m.DispenserDetailsPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
