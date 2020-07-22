import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

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
  type      = ['Hot Water', 'Warm water', 'Cold water'];
  
  constructor(
    public navCtrl      : NavController,
  ) { }

  ngOnInit() {
  }
  async searchDipsenser()
  {
    this.navCtrl.navigateRoot('/dispenser-information');
  }


}
