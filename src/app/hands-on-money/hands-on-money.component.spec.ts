import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandsOnMoneyComponent } from './hands-on-money.component';

describe('HandsOnMoneyComponent', () => {
  let component: HandsOnMoneyComponent;
  let fixture: ComponentFixture<HandsOnMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandsOnMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandsOnMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
