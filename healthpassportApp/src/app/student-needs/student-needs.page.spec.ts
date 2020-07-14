import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentNeedsPage } from './student-needs.page';

describe('StudentNeedsPage', () => {
  let component: StudentNeedsPage;
  let fixture: ComponentFixture<StudentNeedsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentNeedsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentNeedsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
