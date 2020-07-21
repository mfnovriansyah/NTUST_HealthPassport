import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import {NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private deviceid = '';
  constructor(
    private router      : Router,
    public navCtrl      : NavController,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.deviceid = params['deviceId'];
    });
  }
  async drinkwater()
  {
    console.log(this.deviceid);
    let navigationExtras: NavigationExtras = {
			state	: {
				deviceid	: this.deviceid
			}
    };
    
    this.navCtrl.navigateRoot('/login',navigationExtras);
  } 
  async studentneeds()
  {
    this.navCtrl.navigateRoot('/student-needs');
  }
    
}
