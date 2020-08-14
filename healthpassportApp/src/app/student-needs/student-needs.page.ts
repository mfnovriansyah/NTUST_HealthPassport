import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-student-needs',
  templateUrl: './student-needs.page.html',
  styleUrls: ['./student-needs.page.scss'],
})
export class StudentNeedsPage implements OnInit {
  studentNeeds = {
      temperature			: '',
      type			      : ''
  }
  type      = ['Hot Water', 'Cold Water'];
  
  constructor(
    public navCtrl      : NavController,
  ) { }

  ngOnInit() {
  }
  async searchDipsenser()
  {
    let navigationExtras: NavigationExtras = {
			state	: {
        type	: this.studentNeeds.type,
        temperature	: this.studentNeeds.temperature
      }
    };
    this.navCtrl.navigateRoot('/dispenser-information',navigationExtras);
  }


}
