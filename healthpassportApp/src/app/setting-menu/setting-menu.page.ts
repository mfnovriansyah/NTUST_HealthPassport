import { Component, OnInit,NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute,  Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-setting-menu',
  templateUrl: './setting-menu.page.html',
  styleUrls: ['./setting-menu.page.scss'],
})
export class SettingMenuPage implements OnInit {

  //variable to save deviceId from Form
  dataForm = {
    deviceId         : ''
  }

  constructor(

    public loadingCtrl  : LoadingController,
    public storage      : Storage,
    public navCtrl      : NavController,
    private toastCtrl: ToastController,
    public route	      : ActivatedRoute, 
		public router	      : Router 
    ) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) 
        {
          this.dataForm.deviceId 	= this.router.getCurrentNavigation().extras.state.deviceid;
        }
      });
     }

  //Set Device Id and Save it to Storage
  async setDeviceId()
  {
    let loading = await this.loadingCtrl.create({
      message    : 'Set Device',
    });
    console.log(this.dataForm);
    await loading.present();
    if(this.dataForm.deviceId != null)
    {
      let navigationExtras: NavigationExtras = {
        state	: {
          deviceid	: this.dataForm.deviceId
        }
      };
      this.storage.set('settingData', JSON.stringify(this.dataForm)).then(() => {
        loading.dismiss();
        console.log(this.dataForm);
        this.navCtrl.navigateRoot('/home',navigationExtras);
      });
    }

  }
  ngOnInit() {
      
  }

}
