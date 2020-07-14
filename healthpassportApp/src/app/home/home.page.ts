import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router      : Router,
    public navCtrl      : NavController
  ) {}
  ngOnInit() {
    console.log(this.router.url);
  }
  async drinkwater()
  {
    this.navCtrl.navigateRoot('/login');
  } 
  async studentneeds()
  {
    this.navCtrl.navigateRoot('/student-needs');
  }
    
}
