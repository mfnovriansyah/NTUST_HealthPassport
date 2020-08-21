import { Component, OnInit } from '@angular/core';
import {NavController,LoadingController,ToastController} from '@ionic/angular';
import { ActivatedRoute,  Router, NavigationExtras} from '@angular/router';
import { ApiService } from '../service/api.service';
import { AbstractExtendedWebDriver } from 'protractor/built/browser';

@Component({
  selector: 'app-dispenser-information',
  templateUrl: './dispenser-information.page.html',
  styleUrls: ['./dispenser-information.page.scss'],
})
export class DispenserInformationPage implements OnInit {
 
  studentNeeds = {
    temperature			: '',
    type			      : ''
  }
  info = '';
  deviceId : any = [];  
  data : any = []; // for Dispenser Details Data
  filterData : any;
  

  constructor(
    public navCtrl      : NavController,
    public route	      : ActivatedRoute, 
    public router	      : Router ,
    public loadingCtrl	: LoadingController,
    public apiSvc				: ApiService,
    private toastCtrl: ToastController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) 
      {
        this.studentNeeds.type 	= this.router.getCurrentNavigation().extras.state.type;
        this.studentNeeds.temperature 	= this.router.getCurrentNavigation().extras.state.temperature;
      }
      if(this.studentNeeds.type != '' && this.studentNeeds.temperature != '')
      {
        this.getDispenserInformation();
      }
      else if(this.studentNeeds.type == '' || this.studentNeeds.temperature == '')
      {
        this.navCtrl.navigateRoot('/student-needs');
      }
    });
    
   }

  ngOnInit() {
  }
  async getDispenserInformation()
  {
    let loading = await this.loadingCtrl.create({
        message    : 'Searching Dispenser',
        spinner:    'crescent',
        cssClass: 'custom-loading',
        duration:   5000
    });
    //to inform if No Card ID Detected
    let errorToast;
    errorToast = await this.toastCtrl.create({
      message: 'Error searching Dispenser meets your needs',
      duration: 2000,
      position: 'top'
    });
    await loading.present();        
    this.apiSvc.getDispenser('/all').then(
      success => {
        let respon = JSON.parse(this.apiSvc.getDataResult.data);
        if(respon.msg == 'success'){
          this.loadingCtrl.dismiss();
          this.data= respon;
          this.filteringData();
        }
        else{
          errorToast.present();
          this.navCtrl.navigateRoot('/student-needs');
        }
      }
    );    
  }

  //filtering data function is for filter dispenser data based on type and temperature
  async filteringData()
  {
    let noDispenser;
    noDispenser = await this.toastCtrl.create({
      message: 'No dispenser meets your needs',
      duration: 2000,
      position: 'top'
    });
    if(this.studentNeeds.type == 'Hot Water')
    {
      //filter data
      this.filterData = this.data.Data.filter((dispenser)=> {
        return dispenser.HotTemp >=  this.studentNeeds.temperature;
      });

    }
    else if(this.studentNeeds.type == 'Cold Water')
    {
      //filter data
      this.filterData = this.data.Data.filter((dispenser)=> {
        return dispenser.ColdTemp <=  this.studentNeeds.temperature;
      });
    }
  
    if(this.filterData.length == 0)
    {
      this.info = 'No dispenser meets your needs'
      noDispenser.present();
      this.navCtrl.navigateRoot('/student-needs');
    }
    if(this.filterData.length == 1)
    { 
      this.deviceId[0] =this.filterData[0].Device_ID;
      this.info = 'There is 1 dispenser meet your needs';
    }
    if(this.filterData.length == 2)
    {
      this.deviceId[0] =this.filterData[0].Device_ID;
      this.deviceId[1] =this.filterData[1].Device_ID;
      this.info = 'There are 2 dispensers meet your needs';
    }
    if(this.filterData.length >= 3)
    {
      this.deviceId[0] =this.filterData[0].Device_ID;
      this.deviceId[1] =this.filterData[1].Device_ID;
      this.deviceId[2] =this.filterData[2].Device_ID;
      this.info = 'There are 3 dispensers meet your needs';
    }
  }

  //dispenserDetails function to go to dispenser details with device id parameters
  async dispenserDetails(device)
  {
    console.log(device);
    let navigationExtras: NavigationExtras = {
			state	: {
        deviceId	: device,
        type	: this.studentNeeds.type,
        temperature	: this.studentNeeds.temperature
      }
    };
    console.log(navigationExtras);
    this.navCtrl.navigateRoot('/dispenser-details',navigationExtras);
  }

}
