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
  dataForm	: any = {};
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
    this.deviceLocked()
  }

  //to Logout
  async logout()
  {
    // update status card id after click logout button
    this.dataForm.id = this.data.card_id;
    this.dataForm.login = false;
    this.dataForm.locked = false;
    this.dataForm.device = null;

    this.apiSvc.put('/setlogin/status', this.dataForm).then(
      success => {
        let respon = JSON.parse(this.apiSvc.getDataResult.data);
        console.log(respon);
        if(respon == "Status updated successfully.")
        {
          if(this.deviceid)
          {
            this.navCtrl.navigateRoot(['/home', this.deviceid ]);
          }
          else{
            this.navCtrl.navigateRoot('/home');
          }
        }
        else
        {
          console.log("failed to update.");
        }
      }
    );  
  }
  async deviceLocked()
  {
    // update status card id to make device locked
    this.dataForm.id = this.data.card_id;
    this.dataForm.login = this.data.login;
    this.dataForm.locked = true;
    this.dataForm.device = this.data.device;
    this.apiSvc.put('/setlogin/status', this.dataForm).then(
      success => {
        let respon = JSON.parse(this.apiSvc.getDataResult.data);
        if(respon == "Status updated successfully.")
        {
          console.log("success");
        }
        else
        {
          console.log("failed to update.");
        }
        
      }
    );  
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
  				if(respon.Data[0].login ==true && respon.Data[0].locked == false)
  				{
            this.data = respon.Data[0];
            //put method to update to database locked
            this.deviceLocked();
  				}
  			}
  		);
  	}
}
