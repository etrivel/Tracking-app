import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievingMoneyComponent } from './recieving-money.component';

describe('RecievingMoneyComponent', () => {
  let component: RecievingMoneyComponent;
  let fixture: ComponentFixture<RecievingMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecievingMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievingMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
