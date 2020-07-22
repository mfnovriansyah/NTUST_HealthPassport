import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DispenserInformationPage } from './dispenser-information.page';

describe('DispenserInformationPage', () => {
  let component: DispenserInformationPage;
  let fixture: ComponentFixture<DispenserInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispenserInformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DispenserInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
