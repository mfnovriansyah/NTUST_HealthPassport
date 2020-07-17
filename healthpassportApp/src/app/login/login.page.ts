import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {NavController,Platform} from '@ionic/angular';
import { ActivatedRoute,  Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private deviceid	: '';
  constructor(
    public platform				: Platform,
    private screenOrientation	: ScreenOrientation,
    public navCtrl      : NavController,
    public route	      : ActivatedRoute, 
		public router	      : Router 
    
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) 
      {
        this.deviceid 	= this.router.getCurrentNavigation().extras.state.deviceid;
      }
    });
  }

  
  ngOnInit() {
    if(this.platform.is('cordova'))
		{
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    else{
    }
  }
  async loginWithCard()
  {
    let navigationExtras: NavigationExtras = {
			state	: {
				deviceid	: this.deviceid
      }
    };
    this.navCtrl.navigateRoot('/personal-information',navigationExtras);
  }
}
