import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import {NavController, LoadingController} from '@ionic/angular';
import { Storage } from '@ionic/storage';

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
    private route: ActivatedRoute,
    public storage      : Storage,
    public loadingCtrl     : LoadingController
    
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) 
      {
        this.deviceid 	= this.router.getCurrentNavigation().extras.state.deviceid;
      }
    });
    if(this.deviceid == null || this.deviceid == 'undefined' || !this.deviceid){
      this.checkDeviceId();
    }
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
  //check Device ID in Storage
  async checkDeviceId(){
    let loading = await this.loadingCtrl.create({
        message    : 'Checking DeviceID',
    });
    await loading.present();
    this.storage.get('settingData').then((val) => {

      loading.dismiss(); 
      
      if(val != '' && val != null)
      {
        let data = JSON.parse(val);
        console.log(data.deviceId);
        this.deviceid = data.deviceId;
      }else{
        this.navCtrl.navigateRoot('/setting-menu');
      }      
    });
  }
  async settingMenu(){
    let navigationExtras: NavigationExtras = {
			state	: {
				deviceid	: this.deviceid
			}
    };
    this.navCtrl.navigateRoot('/setting-menu',navigationExtras);
  }
}
