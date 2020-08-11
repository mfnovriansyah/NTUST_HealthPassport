import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingMenuPage } from './setting-menu.page';

describe('SettingMenuPage', () => {
  let component: SettingMenuPage;
  let fixture: ComponentFixture<SettingMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
