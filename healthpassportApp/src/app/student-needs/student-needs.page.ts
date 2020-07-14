import { Component, OnInit } from '@angular/core';

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
  
  constructor() { }

  ngOnInit() {
  }

}
