import { Component, OnInit } from '@angular/core';
import {LoadingController,NavController } from '@ionic/angular';


import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {
  data : any = []; // for access id
  
  device	  = ''; //for device id
  constructor(
    public navCtrl      : NavController,
    public loadingCtrl	: LoadingController,
    public apiSvc				: ApiService
  ) { }

  ngOnInit() {
    this.device  = 'gym0201';
    this.getData();
  }
  //to Logout
  async logout()
  {
    this.navCtrl.navigateRoot('/home');
  }
  //to GetData with  Device ID
  async getData()
  	{
        let loading = await this.loadingCtrl.create({
            message    : 'Loading Data',
        });
        console.log(this.device);
        await loading.present();
        
  		  this.apiSvc.get('/check/device='+this.device+'').then(
  			success => {
  				loading.dismiss();
          let respon = JSON.parse(this.apiSvc.getDataResult.data);
          console.log(respon.Data[0]);
  				if(respon.Data[0].login ==true && respon.Data[0].locked == false)
  				{
            this.data = respon.Data[0];
            this.data.locked = true;
            //put update to database locked
            
  				}
  			}
  		);
  	}
}
