import { Component, OnInit } from '@angular/core';
import {LoadingController,NavController} from '@ionic/angular';
import { ActivatedRoute,  Router } from '@angular/router';


import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {
  data : any = []; // for access id
  private deviceid	: '';
  constructor(
    public navCtrl      : NavController,
    public loadingCtrl	: LoadingController,
    public apiSvc				: ApiService,
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
    this.getData();
  }
  //to Logout
  async logout()
  {
    if(this.deviceid)
    {
      this.navCtrl.navigateRoot(['/home', this.deviceid ]);
    }
    else{
      this.navCtrl.navigateRoot('/home');
    }
    
  }
  //to GetData with  Device ID
  async getData()
  	{
        let loading = await this.loadingCtrl.create({
            message    : 'Loading Data',
        });
        await loading.present();
        
  		  this.apiSvc.get('/check/device='+this.deviceid+'').then(
  			success => {
          loading.dismiss();
          
          let respon = JSON.parse(this.apiSvc.getDataResult.data);
          console.log(respon);
  				if(respon.Data[0].login ==true && respon.Data[0].locked == true)
  				{
            this.data = respon.Data[0];
            this.data.locked = true;
            //put update to database locked
            
  				}
  			}
  		);
  	}
}
